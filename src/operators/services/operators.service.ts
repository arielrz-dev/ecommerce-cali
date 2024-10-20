import { Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/orders.entity';
import { ProductsService } from 'src/products/services/products.service';
import { Operator } from '../entities/operator.entity';

@Injectable()
export class OperatorsService {
  // Missing braces added here
  constructor(private productsService: ProductsService) {}

  getOrdersByUser(id: number): Order {
    const operator: Operator | void = this.findOne(id);
    return {
      date: new Date(),
      operator,
      products: this.productsService.findAll(),
    };
  }

  findOne(id: number): Operator {
    const operator = this.operators.find((item) => item.id === id);
    if (!operator) {
      throw new NotFoundException(`Operator with id ${id} is not found`);
    }
    return operator;
  }

  operators = [
    {
      id: 1,
      email: 'admin@store.com',
      password: 'hashed_password_1',
      role: 'admin',
    },
    {
      id: 2,
      email: 'john.doe@store.com',
      password: 'hashed_password_2',
      role: 'customer',
    },
    {
      id: 3,
      email: 'susan.seller@store.com',
      password: 'hashed_password_3',
      role: 'seller',
    },
    {
      id: 4,
      email: 'warehouse.jack@store.com',
      password: 'hashed_password_4',
      role: 'warehouse_staff',
    },
    {
      id: 5,
      email: 'support.mary@store.com',
      password: 'hashed_password_5',
      role: 'support_agent',
    },
  ];
}
