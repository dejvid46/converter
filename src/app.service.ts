import { Controller } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import configuration from './config/configuration';
import path from 'path';
import sharp from 'sharp';

@Controller()
export class ReceiverController {

  @MessagePattern(configuration().RMQPattern)
  async handleMessage(data: Record<string, any>) {
    console.log('Received message:', data);
    try {

      console.log(data.path);

      const inputPath = `${configuration().uploads}/${data.filename}`; // původní JPG soubor
      const outputFilename = path.basename(data.filename, path.extname(data.filename)) + '.png';
      const outputPath = `${configuration().converted}/${outputFilename}`;

      // konverze pomocí sharp
      await sharp(inputPath)
        .png()
        .toFile(outputPath);

      // volitelně můžeš smazat původní JPG
      // await fs.unlink(inputPath);

      console.log(`Converted file saved at: ${outputPath}`);
      return { status: 'done', output: outputFilename };

    } catch (err) {
      console.error('Image conversion failed:', err);
      return { status: 'error', error: err.message };
    }
  }
}
