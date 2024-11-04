import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { UpdateManufacturerDto } from '../dtos/UpdateManufacturerDto';
import { Manufacturer } from '../entities/manufacturer.entity';
import { CreateManufacturerDto } from '../dtos/CreateManufacturerDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ManufacturersService {
  constructor(
    @InjectRepository(Manufacturer)
    private manufacturerRepository: Repository<Manufacturer>,
  ) {}

  async create(
    createManufacturerDto: CreateManufacturerDto,
  ): Promise<Manufacturer> {
    const existingManufacturer = await this.manufacturerRepository.findOne({
      where: { name: createManufacturerDto.name },
    });
    if (existingManufacturer) {
      throw new ConflictException(
        `Manufacturer with name ${createManufacturerDto.name} already exists`,
      );
    }
    const newManufacturer = this.manufacturerRepository.create(
      createManufacturerDto,
    );
    return await this.manufacturerRepository.save(newManufacturer);
  }

  async findAll(
    page: number = 1,
    pageSize: number = 10,
  ): Promise<Manufacturer[]> {
    return await this.manufacturerRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Manufacturer> {
    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id },
    });
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer with id ${id} not found`);
    }
    return manufacturer;
  }

  async update(
    id: number,
    updateManufacturerDto: UpdateManufacturerDto,
  ): Promise<Manufacturer> {
    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id },
    });
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer with id ${id} not found`);
    }

    const updatedManufacturer = this.manufacturerRepository.merge(
      manufacturer,
      updateManufacturerDto,
    );
    return await this.manufacturerRepository.save(updatedManufacturer);
  }

  async remove(id: number): Promise<void> {
    const manufacturer = await this.manufacturerRepository.findOne({
      where: { id },
    });
    if (!manufacturer) {
      throw new NotFoundException(`Manufacturer with id ${id} not found`);
    }
    await this.manufacturerRepository.remove(manufacturer);
  }
}
