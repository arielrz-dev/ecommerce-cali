import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model, Types } from 'mongoose';
import { CreateOrderDto, UpdateOrderDto } from '../dtos/CreateOrderDto';
import { Order, FilterOrderDto } from '../entities/orders.entity';
import { Product } from 'src/products/entities/Product.entity';

@Injectable()
export class OrderService {
  findOne(id: string) {
    try {
      return this.orderModel.findById(id).populate('buyer').exec();
    } catch (error) {
      console.error('Error fetching order:', error);
      throw error;
    }
  }
  constructor(
    @InjectModel(Order.name) private readonly orderModel: Model<Order>,
    @InjectModel(Product.name) private readonly productModel: Model<Order>,
  ) {}

  // Crear una nueva orden
  async create(createOrderDto: CreateOrderDto): Promise<Order> {
    try {
      const createdOrder = new this.orderModel(createOrderDto);
      return await createdOrder.save();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  }

  async findAll(filterDto: FilterOrderDto): Promise<Order[]> {
    try {
      const { buyerId, productId, startDate, endDate, limit, offset } =
        filterDto;
      const filters: FilterQuery<Order> = {};

      // Verificación explícita y construcción de filtros
      if (buyerId) {
        filters.buyer = new Types.ObjectId(buyerId);
      }

      if (productId) {
        filters.products = new Types.ObjectId(productId);
      }

      if (startDate || endDate) {
        filters.date = {};
        if (startDate) {
          filters.date.$gte = new Date(startDate);
        }
        if (endDate) {
          filters.date.$lte = new Date(endDate);
        }
      }

      // Creación de la consulta
      const query = this.orderModel.find(filters);

      // Aplicar paginación si los valores están definidos
      if (offset !== undefined && offset >= 0) {
        query.skip(offset);
      }

      if (limit !== undefined && limit > 0) {
        query.limit(limit);
      }

      return await query
        .populate('buyer')
        .populate({ path: 'products', model: 'Product' })
        .exec();
    } catch (error) {
      console.error('Error fetching orders:', error.message);
      throw new InternalServerErrorException('Error fetching orders');
    }
  }
  async findById(orderId: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    return order;
  }

  // Actualizar una orden por su ID
  async update(
    orderId: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<Order> {
    const updatedOrder = await this.orderModel
      .findByIdAndUpdate(orderId, updateOrderDto, { new: true })
      .exec();

    if (!updatedOrder) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }

    return updatedOrder;
  }

  // Eliminar una orden por su ID
  async delete(orderId: string): Promise<void> {
    const result = await this.orderModel.findByIdAndDelete(orderId).exec();
    if (!result) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
  }

  async removeProduct(orderId: string, productId: string): Promise<Order> {
    const order = await this.orderModel.findById(orderId).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    order.products.pull(productId);
    return order.save();
  }

  async addProduct(orderId: string, productIds: string[]): Promise<Order> {
    console.log(`productIds: ${productIds}`);
    console.log(`orderId: ${orderId}`);

    const order = await this.orderModel.findById(orderId).exec();
    if (!order) {
      throw new NotFoundException(`Order with ID ${orderId} not found`);
    }
    for (const productId of productIds) {
      const product = await this.productModel.findById(productId).exec();
      if (!product) {
        throw new NotFoundException(`Product with ID ${productId} not found`);
      }
      order.products.push(product._id);
    }
    return order.save();
  }
}
