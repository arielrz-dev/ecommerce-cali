import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from '../entities/orders.entity';
import { ProductsService } from 'src/products/services/products.service';
import { Operator } from '../entities/operator.entity';
import {
  CreateOperatorDto,
  UpdateOperatorDto,
} from '../dtos/CreateOperatorDTO';

@Injectable()
export class OperatorsService {
  constructor(
    @InjectRepository(Operator)
    private operatorsRepository: Repository<Operator>,
    private productsService: ProductsService,
  ) {}

  // async getOrdersByUser(id: number): Promise<Order> {
  //   const operator = await this.findOne(id);
  //   const products = await this.productsService.findAll();
  //   return {
  //     date: new Date(),
  //     operator,
  //     products,
  //   };
  // }

  async findAll(page: number = 1, pageSize: number = 10): Promise<Operator[]> {
    return this.operatorsRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { email: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Operator> {
    const operator = await this.operatorsRepository.findOne({ where: { id } });
    if (!operator) {
      throw new NotFoundException(`Operator with ID ${id} not found`);
    }
    return operator;
  }

  async create(createOperatorDto: CreateOperatorDto): Promise<Operator> {
    const existingOperator = await this.operatorsRepository.findOne({
      where: { email: createOperatorDto.email },
    });
    if (existingOperator) {
      throw new ConflictException(
        `Operator with email ${createOperatorDto.email} already exists`,
      );
    }

    const newOperator = this.operatorsRepository.create(createOperatorDto);
    return this.operatorsRepository.save(newOperator);
  }

  async update(
    id: number,
    updateOperatorDto: UpdateOperatorDto,
  ): Promise<Operator> {
    const operator = await this.operatorsRepository.findOne({ where: { id } });
    if (!operator) {
      throw new NotFoundException(`Operator with id ${id} not found`);
    }

    const updatedOperator = this.operatorsRepository.merge(
      operator,
      updateOperatorDto,
    );
    return await this.operatorsRepository.save(updatedOperator);
  }

  async remove(id: number): Promise<void> {
    const operator = await this.operatorsRepository.findOne({ where: { id } });
    if (!operator) {
      throw new NotFoundException(`Operator with id ${id} not found`);
    }
    await this.operatorsRepository.remove(operator);
  }
}
