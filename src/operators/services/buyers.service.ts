import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Buyer } from '../entities/buyer.entity';
import { CreateBuyerDto } from '../dtos/CreateBuyerDTO';
import { UpdateBuyerDto } from '../dtos/UpdateBuyerDto';

@Injectable()
export class BuyersService {
  constructor(@InjectModel(Buyer.name) private buyerModel: Model<Buyer>) {}

  async create(createBuyerDto: CreateBuyerDto): Promise<Buyer> {
    try {
      const { addresses, ...rest } = createBuyerDto;

      // Crear un nuevo documento asegurando que las direcciones se almacenen correctamente
      const newBuyer = new this.buyerModel({
        ...rest,
        addresses: addresses.map((address) => ({
          street: address.street,
          number: address.number,
          city: address.city,
          country: address.country,
        })),
      });

      return await newBuyer.save();
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(`Validation failed: ${error.message}`);
      }
      throw new Error(`Error creating buyer: ${error.message}`);
    }
  }

  async findAll(): Promise<Buyer[]> {
    try {
      return await this.buyerModel.find().exec();
    } catch (error) {
      throw new Error(`Error retrieving buyers: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Buyer> {
    try {
      return await this.buyerModel.findById(id).populate('addresses').exec();
    } catch (error) {
      throw new Error(`Error fetching buyer: ${error.message}`);
    }
  }

  async update(id: string, changes: UpdateBuyerDto): Promise<Buyer> {
    try {
      const updatedBuyer = await this.buyerModel
        .findByIdAndUpdate(id, { $set: changes }, { new: true })
        .exec();
      if (!updatedBuyer) {
        throw new NotFoundException(`Buyer with ID ${id} not found.`);
      }
      return updatedBuyer;
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new BadRequestException(`Invalid ID format: ${id}`);
      }
      throw new Error(`Error updating buyer: ${error.message}`);
    }
  }

  async remove(id: string): Promise<Buyer> {
    try {
      const deletedBuyer = await this.buyerModel.findByIdAndDelete(id).exec();
      if (!deletedBuyer) {
        throw new NotFoundException(`Buyer with ID ${id} not found.`);
      }
      return deletedBuyer;
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new BadRequestException(`Invalid ID format: ${id}`);
      }
      throw new Error(`Error deleting buyer: ${error.message}`);
    }
  }
}
