import { Injectable, NotFoundException } from '@nestjs/common';
import { Buyer } from '../entities/Buyer.entity';
import { CreateBuyerDto } from '../dtos/CreateBuyerDTO';
import { UpdateBuyerDto } from '../dtos/UpdateBuyerDto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class BuyersService {
  constructor(
    @InjectRepository(Buyer) private buyerRepository: Repository<Buyer>,
  ) {}

  create(data: CreateBuyerDto): Promise<Buyer> {
    const newBuyer = this.buyerRepository.create(data);
    return this.buyerRepository.save(newBuyer);
  }

  findAll(): Promise<Buyer[]> {
    return this.buyerRepository.find();
  }

  async findOne(id: number): Promise<Buyer> {
    const buyer = await this.buyerRepository.findOne(id);
    if (!buyer) {
      throw new NotFoundException(`Buyer with id ${id} is not found`);
    }
    return buyer;
  }

  async update(id: number, payload: UpdateBuyerDto): Promise<Buyer> {
    const buyer = await this.buyerRepository.findOne(id);
    if (!buyer) {
      throw new NotFoundException(`Buyer with id ${id} is not found`);
    }

    const updatedBuyer = Object.assign(buyer, payload);
    return this.buyerRepository.save(updatedBuyer);
  }

  async remove(id: number): Promise<void> {
    const buyer = await this.buyerRepository.findOne(id);
    if (!buyer) {
      throw new NotFoundException(`Buyer with id ${id} is not found`);
    }
    await this.buyerRepository.remove(buyer);
  }
}
