import amqplib from "amqplib";
import { v4 as uuidv4 } from "uuid";

let connection = null;

export const getChannel = async () => {
  if (!connection) {
    connection = await amqplib.connect(process.env.RABBITMQ_URI);
  }
  return await connection.createChannel();
};

const requestData = async (QUEUE_NAME, payload, uuid) => {
  const channel = await getChannel();

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

export const RPCRequest = async (QUEUE_NAME, payload) => {
  const uuid = uuidv4();
  return await requestData(QUEUE_NAME, payload, uuid);
};
