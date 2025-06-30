import { Controller, Get, Inject } from '@nestjs/common';
import { AppService } from './app.service';
import { COMMENTS_SERVICE } from './utils/constants';
import { ClientProxy } from '@nestjs/microservices';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService,
    @Inject(COMMENTS_SERVICE) private client: ClientProxy
  ) { }

  @Get('health')
  health() {
    return { status: 'ok' }
  }

  @Get('comments-health')
  async commentsHealth() {
    const resp = await this.client.send('comments.health', {})
    console.log({
      resp
    })
    return resp;
  }
}
