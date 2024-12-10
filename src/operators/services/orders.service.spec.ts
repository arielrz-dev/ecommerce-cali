import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { OrderService } from '../../operators/services/orders.service';
import { Order } from '../entities/orders.entity';
import { Product } from '../../products/entities/Product.entity';

describe('OrderService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: getModelToken(Order.name),
          useValue: {},
        },
        {
          provide: getModelToken(Product.name),
          useValue: {},
        },
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
