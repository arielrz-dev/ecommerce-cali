import { Module } from '@nestjs/common';
import { OperatorsController } from './controllers/operators.controller';
import { OperatorsService } from './services/operators.service';
import { BuyersService } from './services/buyers.service';
import { ProductsModule } from 'src/products/products.module';
import { BuyersController } from 'src/operators/controllers/buyers.controller';
import { OrdersController } from './controllers/orders.controller';
import { OrdersService } from './services/orders.service';
import { Operator } from './entities/operator.entity';
import { Buyer } from './entities/Buyer.entity';
import { Order } from './entities/orders.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetailOrder } from './entities/detail_order.entity';
import { DetailOrderService } from './services/detail-order.service';
import { DetailOrderController } from './controllers/detailorder.controller';
import { Product } from 'src/products/entities/Product.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Operator, Buyer, Order, DetailOrder, Product]),
    ProductsModule,
  ],
  controllers: [
    OperatorsController,
    BuyersController,
    OrdersController,
    DetailOrderController,
  ],
  providers: [
    OperatorsService,
    BuyersService,
    OrdersService,
    DetailOrderService,
  ],
})
export class OperatorsModule {}
