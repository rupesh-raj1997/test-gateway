import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { COMMENTS_SERVICE, COMMENTS_SERVICE_HOST, COMMENTS_SERVICE_PORT } from './utils/constants';

@Module({
  imports: [
     ClientsModule.register([
      {
        name: COMMENTS_SERVICE,
        transport: Transport.TCP,
        options: {
          host: COMMENTS_SERVICE_HOST,
          port: COMMENTS_SERVICE_PORT,
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
