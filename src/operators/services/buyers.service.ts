import { Injectable, NotFoundException } from '@nestjs/common';
import { Buyer } from '../entities/Buyer.entity';
import { CreateBuyerDto } from '../dtos/CreateBuyerDTO';
import { UpdateBuyerDto } from '../dtos/UpdateBuyerDto';

@Injectable()
export class BuyersService {
  private buyers: Buyer[] = [
    {
      id: 1,
      name: 'John',
      surname: 'Doe',
      phone: '123-456-7890',
    },
    {
      id: 2,
      name: 'Jane',
      surname: 'Smith',
      phone: '098-765-4321',
    },
    {
      id: 3,
      name: 'Alice',
      surname: 'Johnson',
      phone: '555-123-4567',
    },
  ];

  create(createBuyerDto: CreateBuyerDto): Buyer {
    const newBuyerId = this.buyers.length
      ? Math.max(...this.buyers.map((b) => b.id)) + 1
      : 1;

    const newBuyer: Buyer = {
      id: newBuyerId,
      ...createBuyerDto,
    };

    this.buyers.push(newBuyer);
    return newBuyer;
  }

  findAll() {
    return this.buyers;
  }

  findOne(id: number): Buyer {
    const buyer = this.buyers.find((item) => item.id === id);
    if (!buyer) {
      throw new NotFoundException(`Buyer with id ${id} is not found`);
    }
    return buyer;
  }

  update(id: number, payload: UpdateBuyerDto): void {
    const buyerIndex = this.buyers.findIndex((buyer) => buyer.id === id);

    if (buyerIndex !== -1) {
      const updatedBuyer = {
        ...this.buyers[buyerIndex],
        ...payload,
      };

      this.buyers.splice(buyerIndex, 1, updatedBuyer);
    } else {
      console.warn(`Buyer with ID ${id} not found.`);
    }
  }

  remove(id: number) {
    const index = this.buyers.findIndex((buyer) => buyer.id === id);
    if (index !== -1) {
      this.buyers.splice(index, 1);
      return true;
    } else {
      throw new NotFoundException(`Buyer with ID ${id} not found in the array`);
    }
  }
}
