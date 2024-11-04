import { Inject, Injectable } from '@nestjs/common';
// import { InjectRepository } from '@nestjs/typeorm';
// import { Repository } from 'typeorm';
// import { Order } from '../entities/orders.entity';
// import { date } from 'joi';
// import { ProductsService } from 'src/products/services/products.service';

@Injectable()
export class OrdersService {
  // constructor(
  //   @InjectRepository(Order) private orderRepository: Repository<Order>,
  //   @Inject private productsService: ProductsService,
  // ) {}
  // getOrderByUser(id: number) {
  //   const user = this.findOne(id);
  //   return {
  //     date = new Date(),
  //     user,
  //     products: await this.productsService.findAll(),
  //   };
  // }
}
