import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.useGlobalPipes(
  //   new ValidationPipe({
  //     whitelist: true,
  //     forbidNonWhitelisted: true,
  //     disableErrorMessages: false,
  //   }),
  // );

  // await app.listen(3001);
  const port = process.env.PORT || 8080;
  await app.listen(port, '127.0.0.1');
}
bootstrap();
