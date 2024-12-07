import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UpdateManufacturerDto } from '../dtos/UpdateManufacturerDto';
import { Manufacturer } from '../entities/manufacturer.entity';
import { CreateManufacturerDto } from '../dtos/CreateManufacturerDTO';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectModel(Manufacturer.name)
    private manufacturerModel: Model<Manufacturer>,
  ) {}

  create(CreateManufacturersDto: CreateManufacturerDto): Promise<Manufacturer> {
    const newManufacturer = new this.manufacturerModel(CreateManufacturersDto);
    return newManufacturer.save();
  }

  findAll() {
    return this.manufacturerModel.find();
  }

  async findOne(id: number): Promise<Manufacturer> {
    try {
      return this.manufacturerModel.findById(id).exec();
    } catch (error) {
      throw new Error(`Error finding manufacturer: ${error.message}`);
    }
  }

  update(id: number, payload: UpdateManufacturerDto): Promise<Manufacturer> {
    try {
      const updatedManufacturer = this.manufacturerModel
        .findByIdAndUpdate(id, { $set: payload }, { new: true })
        .exec();
      if (!updatedManufacturer) {
        throw new NotFoundException(`Manufacturer with ID ${id} not found.`);
      }
      return updatedManufacturer;
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new BadRequestException(`Invalid ID format: ${id}`);
      }
      throw new Error(`Error updating manufacturer: ${error.message}`);
    }
  }

  remove(id: number) {
    this.manufacturerModel.findByIdAndDelete(id);
  }
}
