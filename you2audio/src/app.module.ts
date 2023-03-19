import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DownloadController } from './download/download.controller';
import { HelloController } from './hello/hello.controller';

@Module({
  imports: [],
  controllers: [AppController, DownloadController, HelloController],
  providers: [AppService],
})
export class AppModule {}
