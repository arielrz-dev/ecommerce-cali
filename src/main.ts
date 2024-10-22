import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const config = new DocumentBuilder()
    .setTitle('PedidosAPI')
    .setDescription('Documentacion para la API de pedidos')
    .setVersion('1.0.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('info', app, document);
  await app.listen(process.env.PORT || 3000);
  // // await app.listen(3001);
  // const port = process.env.PORT || 8080;
  // await app.listen(port, '127.0.0.1');
}
bootstrap();
