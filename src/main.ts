import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { startHocuspocusServer } from './hocuspocus';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: 'http://localhost:5173', // Allow requests from this port
  });
  await app.listen(process.env.PORT ?? 3000);
  startHocuspocusServer()
}
bootstrap();
