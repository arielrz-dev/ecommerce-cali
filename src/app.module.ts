import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { OperatorsModule } from './operators/operators.module';
import { BuyersController } from './buyers/controllers/buyers.controller';
import { BuyersModule } from './buyers/buyers.module';
import { CategoriesModule } from './categories/categories.module';

@Module({
  imports: [
    ProductsModule,
    OrdersModule,
    OperatorsModule,
    BuyersModule,
    CategoriesModule,
  ],
  controllers: [AppController, BuyersController],
  providers: [AppService],
})
export class AppModule {}
