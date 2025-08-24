import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { rabbitMQConfig } from './rabbitmq.options';
import configuration from './config/configuration';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.connectMicroservice(rabbitMQConfig());
  
  await app.startAllMicroservices();
  await app.listen(configuration().port);
}

bootstrap();