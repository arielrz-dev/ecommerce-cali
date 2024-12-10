import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from '../controllers/products.controller';
import { ProductsService } from '../services/products.service';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: jest.Mocked<ProductsService>;

  beforeEach(async () => {
    const mockProductsService = {
      create: jest.fn(),
      findAll: jest.fn(),
      findOne: jest.fn(),
      update: jest.fn(),
      remove: jest.fn(),
    };
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        {
          provide: ProductsService,
          useValue: mockProductsService,
        },
      ],
    })
      // .overrideGuard(JwtAuthGuard)
      // .useValue({ canActivate: jest.fn(() => true) })
      // .overrideGuard(RolesGuard)
      // .useValue({ canActivate: jest.fn(() => true) })
      .compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(
      ProductsService,
    ) as jest.Mocked<ProductsService>;
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('getOne', () => {
    it('debería delegar la búsqueda de un producto al servicio con el ID proporcionado', () => {
      const mockId = '123123';
      controller.getOne(mockId);
      expect(service.findOne).toHaveBeenCalledWith(mockId);
    });
  });
});
