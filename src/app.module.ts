import { Module } from '@nestjs/common';
import { ReceiverController } from './app.service';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    })
  ],
  controllers: [ReceiverController]
})
export class AppModule {}
