import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { Order } from '../entities/orders.entity';
import { ProductsService } from 'src/products/services/products.service';
import { Operator } from '../entities/operator.entity';
import {
  CreateOperatorDto,
  UpdateOperatorDto,
} from '../dtos/CreateOperatorDTO';
import { Client } from 'pg';

@Injectable()
export class OperatorsService {
  constructor(private productsService: ProductsService) {}

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

  getOrdersByUser(id: number): Order {
    const operator: Operator | void = this.findOne(id);
    return {
      date: new Date(),
      operator,
      products: this.productsService.findAll(),
    };
  }

  findAll(): Operator[] {
    return this.operators;
  }

  findOne(id: number): Operator {
    const operator = this.operators.find((item) => item.id === id);
    if (!operator) {
      throw new NotFoundException(`Operator with ID ${id} not found`);
    }
    return operator;
  }

  create(createOperatorDto: CreateOperatorDto): Operator {
    const newOperatorId = this.operators.length
      ? Math.max(...this.operators.map((o) => o.id)) + 1
      : 1;
    const newOperator: Operator = {
      id: newOperatorId,
      ...createOperatorDto,
    };
    this.operators.push(newOperator);
    return newOperator;
  }

  update(id: number, payload: UpdateOperatorDto): Operator {
    const operatorIndex = this.operators.findIndex(
      (operator) => operator.id === id,
    );
    if (operatorIndex === -1) {
      throw new NotFoundException(`Operator with ID ${id} not found`);
    }
    const updatedOperator = { ...this.operators[operatorIndex], ...payload };
    this.operators[operatorIndex] = updatedOperator;
    return updatedOperator;
  }

  remove(id: number): boolean {
    const index = this.operators.findIndex((operator) => operator.id === id);
    if (index === -1) {
      throw new NotFoundException(`Operator with ID ${id} not found`);
    }
    this.operators.splice(index, 1);
    return true;
  }
}
