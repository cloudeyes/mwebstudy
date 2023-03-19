import { Controller, Get, Query, Res } from '@nestjs/common';

import * as ytdl from 'ytdl-core';

// http://localhost:3000/download/mp4?url=HtbnfBFIJls

@Controller('download')
export class DownloadController {
  async getAudioStream(videoUrl: string) {
    console.log('videoUrl:', videoUrl);
    const audioStream = ytdl(videoUrl, {
      filter: (format) => format.container === 'mp4',
      quality: 'highestaudio',
    });
    return audioStream;
  }

  @Get('mp4')
  async convertAudio(@Query('url') url: string, @Res() res): Promise<any> {
    const stream = await this.getAudioStream(
      `https://www.youtube.com/watch?v=${url}`,
    );

    const headers = {
      'Content-Type': 'video/mp4',
      'Access-Control-Allow-Origin': '*', // Enable CORS for all domains
    };

    res.writeHead(200, headers);
    stream.pipe(res);
  }
}
