import { Transport, RmqOptions } from '@nestjs/microservices';
import configuration from './config/configuration';

export const rabbitMQConfig = (): RmqOptions => ({
  transport: Transport.RMQ,
  options: {
    urls: [configuration().rabbitMQ_URL], // Replace with your RabbitMQ server URL
    queue: configuration().rabbitMQQueue,
    queueOptions: {
      durable: true,
    },
  },
});