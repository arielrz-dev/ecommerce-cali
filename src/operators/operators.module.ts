import { Module } from '@nestjs/common';
import { OperatorsController } from './controllers/operators.controller';
import { OperatorsService } from './services/operators.service';
import { BuyersService } from './services/buyers.service';
import { ProductsModule } from 'src/products/products.module';
import { BuyersController } from 'src/operators/controllers/buyers.controller';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';

@Module({
  imports: [ProductsModule],
  controllers: [OperatorsController, BuyersController, OrdersController],
  providers: [OperatorsService, BuyersService, OrdersService],
})
export class OperatorsModule {}
