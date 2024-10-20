import { Module } from '@nestjs/common';
import { OrdersController } from '../operators/controllers/orders.controller';
import { OrdersService } from '../operators/services/orders.service';

@Module({
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
