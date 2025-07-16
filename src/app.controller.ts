import { Body, Controller, Delete, Get, Inject, Param, Patch, Post } from '@nestjs/common';
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
    return resp;
  }


  @Post('comment/')
  async createNewComment(@Body() body: any) {
    try {
      const resp = this.client.send({ cmd: 'comment.create' }, body);
      console.log("POST COMMENT resp", resp)
      return resp;
    } catch (err) {
      console.log("POST COMMENT err", err)
    }
  }

  @Get('comment/:id')
  async findOneComment(@Param('id') id: string) {
    return this.client.send({ cmd: 'comment.findOne' }, id);
  }

  @Patch('comment/:id')
  async updateComment(@Param('id') id: string, @Body() body: any) {
    const resp = await this.client.send({ cmd: 'comment.update' }, { id, ...body });
    return resp;
  }

  @Delete('comment/:id')
  async deleteComment(@Param('id') id: string) {
    const resp = await this.client.send({ cmd: 'comment.remove' }, id);
    return resp;
  }

  @Get('comment/thread/:id')
  async commentThread(@Param('id') id: string) {
    const resp = await this.client.send({ cmd: 'comment.thread' }, id);
    return resp;
  }
}