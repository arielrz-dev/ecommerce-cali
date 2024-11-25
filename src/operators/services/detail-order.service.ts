import { Injectable, Logger, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from 'src/products/entities/Product.entity';
import { Repository } from 'typeorm';
import { DetailOrder } from '../entities/detail_order.entity';
import { Order } from '../entities/orders.entity';
import { CreateDetailOrderDto } from '../dtos/CreateDetailOrderDto';

@Injectable()
export class DetailOrderService {
  constructor(
    @InjectRepository(DetailOrder)
    private detailOrderRepository: Repository<DetailOrder>,

    @InjectRepository(Order) private orderRepository: Repository<Order>,

    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async findOne(id: number): Promise<DetailOrder> {
    const detailOrder = await this.detailOrderRepository.findOne({
      where: { id },
      relations: ['product'],
    });
    if (!detailOrder) {
      throw new NotFoundException(`DetailOrder with id ${id} not found`);
    }
    return detailOrder;
  }

  async create(
    createDetailOrderDto: CreateDetailOrderDto,
  ): Promise<DetailOrder> {
    const { orderId, productId, quantity } = createDetailOrderDto;

    const [order, product] = await Promise.all([
      this.orderRepository.findOne({ where: { id: orderId } }),
      this.productRepository.findOne({ where: { id: productId } }),
    ]);

    // Validar la existencia de los recursos
    if (!order) {
      throw new NotFoundException(`Order with id ${orderId} not found`);
    }
    if (!product) {
      throw new NotFoundException(`Product with id ${productId} not found`);
    }

    const detailOrder = this.detailOrderRepository.create({
      order,
      product,
      quantity,
    });

    Logger.error(detailOrder);

    return this.detailOrderRepository.save(detailOrder);
  }
}
