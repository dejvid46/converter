import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import configuration from './config/configuration';
import path from 'path';
import sharp from 'sharp';

interface ReceivedMessage {
  filename: string;
  path: string;
  targetFormat: string;
}

@Controller()
export class ReceiverController {

  @MessagePattern(configuration().RMQPattern)
  async handleMessage(data: ReceivedMessage) {
    console.log('Received message:', data);

    const inputPath = `${configuration().uploads}/${data.filename}`;
    const outputFilename = path.basename(data.filename, path.extname(data.filename)) + "." + data.targetFormat;
    const outputPath = `${configuration().converted}/${outputFilename}`;

    try {
      await sharp(inputPath)
        .png()
        .toFile(outputPath);
      
      let res = { status: 'done', output: outputFilename };
      console.log(res);

      return { status: 'done', output: outputFilename };
    } catch (err) {
      console.error('Image conversion failed:', err);
      return { status: 'error', error: err.message };
    }
  }
}
