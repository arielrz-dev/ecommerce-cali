import { Module } from '@nestjs/common';
import { OperatorsController } from './controllers/operators.controller';
import { OperatorsService } from './services/operators.service';
import { BuyersService } from './services/buyers.service';
import { ProductsModule } from 'src/products/products.module';
import { BuyersController } from 'src/operators/controllers/buyers.controller';
import { OrdersController } from './controllers/orders.controller';
import { OrderService } from './services/orders.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BuyerSchema } from './entities/buyer.entity';
import { Order, OrderSchema } from './entities/orders.entity';
import { ProductSchema } from 'src/products/entities/Product.entity';
import { OperatorSchema } from './entities/operator.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Buyer', schema: BuyerSchema },
      {
        name: Order.name,
        schema: OrderSchema,
      },
      { name: 'Product', schema: ProductSchema },
      { name: 'Operator', schema: OperatorSchema },
    ]),
    ProductsModule,
  ],
  controllers: [OperatorsController, BuyersController, OrdersController],
  providers: [OperatorsService, BuyersService, OrderService],
  exports: [OperatorsService],
})
export class OperatorsModule {}
