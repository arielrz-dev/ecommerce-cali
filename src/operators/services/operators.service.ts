import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Operator } from '../entities/operator.entity';
import {
  CreateOperatorDto,
  UpdateOperatorDto,
} from '../dtos/CreateOperatorDTO';
import { BuyersService } from './buyers.service';

@Injectable()
export class OperatorsService {
  constructor(
    @InjectRepository(Operator)
    private operatorRepository: Repository<Operator>,
    private buyersService: BuyersService,
  ) {}

  async findAll(): Promise<Operator[]> {
    return this.operatorRepository.find({
      relations: ['buyer'],
    });
  }

  async findOne(id: number): Promise<Operator> {
    const operator = await this.operatorRepository.findOne({
      where: { id },
      relations: ['buyer'],
    });
    if (!operator) {
      throw new NotFoundException(`Operator with ID ${id} not found`);
    }
    return operator;
  }

  async create(data: CreateOperatorDto): Promise<Operator> {
    const existingOperator = await this.operatorRepository.findOne({
      where: { email: data.email },
    });
    if (existingOperator) {
      throw new ConflictException(
        `Operator with email ${data.email} already exists`,
      );
    }

    let buyer = null;
    if (data.buyerId) {
      buyer = await this.buyersService.findOne(data.buyerId);
      if (!buyer) {
        throw new NotFoundException(`Buyer with ID ${data.buyerId} not found`);
      }
    }

    const newOperator = this.operatorRepository.create({
      ...data,
      buyer,
    });

    return this.operatorRepository.save(newOperator);
  }

  async update(
    id: number,
    updateOperatorDto: UpdateOperatorDto,
  ): Promise<Operator> {
    const operator = await this.operatorRepository.findOne({
      where: { id },
      relations: ['buyer'], // Cargar la relación buyer
    });
    if (!operator) {
      throw new NotFoundException(`Operator with id ${id} not found`);
    }

    if (updateOperatorDto.buyerId) {
      const buyer = await this.buyersService.findOne(updateOperatorDto.buyerId);
      if (!buyer) {
        throw new NotFoundException(
          `Buyer with ID ${updateOperatorDto.buyerId} not found`,
        );
      }
      operator.buyer = buyer;
    }

    const updatedOperator = this.operatorRepository.merge(
      operator,
      updateOperatorDto,
    );

    return await this.operatorRepository.save(updatedOperator);
  }

  async remove(id: number): Promise<void> {
    const operator = await this.operatorRepository.findOne({
      where: { id },
    });
    if (!operator) {
      throw new NotFoundException(`Operator with id ${id} not found`);
    }
    await this.operatorRepository.remove(operator);
  }
}
