const amqplib = require("amqplib");
const { v4: uuidv4 } = require("uuid");
const Service = require("../../services/UserManagement.service.js");

let connection = null;
const service = new Service();

exports.getChannel = async () => {
  connection = await amqplib.connect(process.env.RABBITMQ_URI);

  return await connection.createChannel();
};

exports.RPCObserver = async (QUEUE_NAME) => {
  const channel = await this.getChannel();

  await channel.assertQueue(QUEUE_NAME, {
    durable: false,
  });

  channel.prefetch(1);
  channel.consume(
    QUEUE_NAME,
    async (msg) => {
      if (msg.content) {
        const payload = JSON.parse(msg.content.toString());
        const response = await service.eventHandler(payload);

        channel.sendToQueue(
          msg.properties.replyTo,
          Buffer.from(JSON.stringify(response)),
          {
            correlationId: msg.properties.correlationId,
          }
        );

        channel.ack(msg);
      }
    },
    {
      noAck: false,
    }
  );
};

const requestData = async (QUEUE_NAME, payload, uuid) => {
  const channel = await this.getChannel();

  const q = await channel.assertQueue("", {
    exclusive: true,
  });

  channel.sendToQueue(QUEUE_NAME, Buffer.from(JSON.stringify(payload)), {
    replyTo: q.queue,
    correlationId: uuid,
  });

  return new Promise((resolve, reject) => {
    channel.consume(
      q.queue,
      (msg) => {
        if (msg.properties.correlationId === uuid) {
          resolve(JSON.parse(msg.content.toString()));
        } else {
          reject("Data not found");
        }
      },
      {
        noAck: true,
      }
    );
  });
};

exports.RPCRequest = async (QUEUE_NAME, payload) => {
  const uuid = uuidv4();
  return await requestData(QUEUE_NAME, payload, uuid);
};
