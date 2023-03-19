import { Controller, Get } from '@nestjs/common';

@Controller('hello')
export class HelloController {
  @Get('/greet')
  getHello() {
    return 'Hello World!';
  }
}
