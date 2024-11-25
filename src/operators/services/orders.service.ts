import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Buyer } from '../entities/buyer.entity';
import { Order } from '../entities/orders.entity';
import { DeleteResult, Repository } from 'typeorm';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/CreateOrderDto';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepository: Repository<Order>,
    @InjectRepository(Buyer) private buyerRepository: Repository<Buyer>,
  ) {}

  findAll(): Promise<Order[]> {
    return this.orderRepository.find();
  }

  async findOne(id: number): Promise<Order> {
    const order = await this.orderRepository.findOne({
      where: { id },
      relations: ['details', 'details.product'],
    });
    if (!order) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }
    return order;
  }

  async create(order: CreateOrderDto): Promise<Order> {
    const newOrder = new Order();
    if (order.buyerId) {
      const buyer = await this.buyerRepository.findOne(order.buyerId);
      if (!buyer) {
        throw new NotFoundException(`Buyer with id ${order.buyerId} not found`);
      }
      newOrder.buyer = buyer; // Fuera del bloque if
    }
    return this.orderRepository.save(newOrder);
  }

  async update(id: number, updateOrder: UpdateOrderDto): Promise<Order> {
    const orderToUpdate = await this.orderRepository.findOne(id);
    if (!orderToUpdate) {
      throw new NotFoundException(`Order with id ${id} not found`);
    }

    // Validar si hay un `buyerId` en los datos de actualización
    if (updateOrder.buyerId) {
      const buyer = await this.buyerRepository.findOne(updateOrder.buyerId);
      if (!buyer) {
        throw new NotFoundException(
          `Buyer with id ${updateOrder.buyerId} not found`,
        );
      }
      orderToUpdate.buyer = buyer; // Actualizar el comprador en la orden
    }
    const updatedOrder = this.orderRepository.merge(orderToUpdate, updateOrder);

    return this.orderRepository.save(updatedOrder);
  }

  remove(id: number): Promise<DeleteResult> {
    return this.orderRepository.delete({ id });
  }
}
