import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreateOperatorDto } from '../dtos/CreateOperatorDto';
import { UpdateOperatorDto } from '../dtos/UpdateOperatorDto';
import { Operator } from '../entities/operator.entity';
import * as bcrypt from 'bcrypt';

@Injectable()
export class OperatorsService {
  constructor(
    @InjectModel(Operator.name) private operatorModel: Model<Operator>,
  ) {}

  async create(
    createOperatorDto: CreateOperatorDto,
  ): Promise<Omit<Operator, 'password'>> {
    try {
      // Crear un nuevo documento basado en el DTO
      const hashedPassword = await bcrypt.hash(createOperatorDto.password, 10);

      // Crear el operador con la contraseña encriptada
      const operator = new this.operatorModel({
        ...createOperatorDto,
        password: hashedPassword,
      });

      const savedOperator = await operator.save();

      // Excluir la contraseña del resultado
      const { password, ...rta } = savedOperator.toObject();
      return rta;
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(`Validation failed: ${error.message}`);
      }
      throw new Error(`Error creating operator: ${error.message}`);
    }
  }

  async findByEmail(email: string): Promise<Operator> {
    try {
      return await this.operatorModel.findOne({ email }).exec();
    } catch (error) {
      throw new Error(`Error finding operator by email: ${error.message}`);
    }
  }

  async findAll(): Promise<Operator[]> {
    try {
      return await this.operatorModel.find().exec();
    } catch (error) {
      throw new Error(`Error retrieving operators: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Operator> {
    try {
      const operator = await this.operatorModel.findById(id).exec();
      if (!operator) {
        throw new NotFoundException(`Operator with ID ${id} not found.`);
      }
      return operator;
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new BadRequestException(`Invalid ID format: ${id}`);
      }
      throw new Error(`Error finding operator: ${error.message}`);
    }
  }

  async update(id: string, changes: UpdateOperatorDto): Promise<Operator> {
    try {
      const updatedOperator = await this.operatorModel
        .findByIdAndUpdate(id, { $set: changes }, { new: true })
        .exec();
      if (!updatedOperator) {
        throw new NotFoundException(`Operator with ID ${id} not found.`);
      }
      return updatedOperator;
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new BadRequestException(`Invalid ID format: ${id}`);
      }
      throw new Error(`Error updating operator: ${error.message}`);
    }
  }

  async remove(id: string): Promise<Operator> {
    try {
      const deletedOperator = await this.operatorModel
        .findByIdAndDelete(id)
        .exec();
      if (!deletedOperator) {
        throw new NotFoundException(`Operator with ID ${id} not found.`);
      }
      return deletedOperator;
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new BadRequestException(`Invalid ID format: ${id}`);
      }
      throw new Error(`Error deleting operator: ${error.message}`);
    }
  }
}
