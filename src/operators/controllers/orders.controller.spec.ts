import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../controllers/orders.controller';
import { OrderService } from '../services/orders.service';

describe('OrdersController', () => {
  let controller: OrdersController;
  let service: OrderService;

  beforeEach(async () => {
    const mockOrdersService = {
      findAll: jest.fn(() => Promise.resolve([{ id: 1, name: 'Order 1' }])), // Cambia el método a findAll
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [{ provide: OrderService, useValue: mockOrdersService }],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getAllOrders', () => {
    it('should return a list of orders', async () => {
      const result = await controller.getAllOrders(); // Llama al controlador correctamente
      expect(result).toEqual([{ id: 1, name: 'Order 1' }]); // Verifica el resultado mockeado
      expect(service.findAll).toHaveBeenCalled(); // Cambia a findAll
    });
  });
});
