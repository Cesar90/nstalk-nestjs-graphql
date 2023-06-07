import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UploadsController } from './upload.controller';

@Module({
  controllers:[UploadsController],
  imports: [ConfigModule],
})
export class UploadsModule {}
