import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OperatorsModule } from './operators/operators.module';

@Module({
  imports: [ProductsModule, OperatorsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
