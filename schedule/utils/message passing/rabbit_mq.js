import amqplib from "amqplib";

export const createChannel = async () => {
  try {
    const connection = await amqplib.connect(process.env.RABBITMQ_URI);
    const channel = await connection.createChannel();

    await channel.assertExchange(process.env.EXCHANGE_NAME, "direct", false);

    return channel;
  } catch (error) {
    console.log(error);
  }
};

export const publishMessage = async (channel, bind_key, message) => {
  try {
    await channel.publish(
      process.env.EXCHANGE_NAME,
      bind_key,
      Buffer.from(message)
    );
    console.log("message published from schedule service.");
  } catch (error) {
    console.log(error);
  }
};

export const subscribeMessage = async (channel, service, bind_key) => {
  try {
    const appQueue = await channel.assertQueue("QUEUE_NAME");
    channel.bindQueue(appQueue.queue, process.env.EXCHANGE_NAME, bind_key);

    channel.consume(appQueue, (data) => {
      console.log("received data");
      console.log(data.content.toString());
      channel.ack(data);
    });
  } catch (error) {
    console.log(error);
  }
};
