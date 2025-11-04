export default () => ({
  port: parseInt(process.env.PORT || "3000", 10),
  uploads: process.env.UPLOADS || "./storage/uploads",
  converted: process.env.CONVERTED || "./storage/converted",
  RMQPattern: process.env.RMQPATTERN || "image_pattern",
  rabbitMQ_URL: process.env.RABBITMQ_URL || "amqp://localhost:5672",
  rabbitMQQueue: process.env.RABBITMQQUEUE || "image_convert"
});