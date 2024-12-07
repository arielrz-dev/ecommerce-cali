import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { FilterProductDto, Product } from '../entities/Product.entity';
import { CreateProductDto } from '../dtos/CreateProductDTO';
import { UpdateProductDto } from '../dtos/UpdateProductDTO';
import { InjectModel } from '@nestjs/mongoose';
import { FilterQuery, Model } from 'mongoose';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    try {
      const newProduct = new this.productModel(createProductDto);
      return await newProduct.save();
    } catch (error) {
      if (error.name === 'ValidationError') {
        throw new BadRequestException(`Validation failed: ${error.message}`);
      }
      throw new Error(`Error creating product: ${error.message}`);
    }
  }

  async findAll(params?: FilterProductDto): Promise<Product[]> {
    try {
      const filters: FilterQuery<Product> = {};

      // Si se proporciona un filtro de precio, aplicamos el filtro
      if (params?.priceMin !== undefined || params?.priceMax !== undefined) {
        filters.price = {};
        if (params?.priceMin !== undefined) {
          filters.price.$gte = params.priceMin;
        }
        if (params?.priceMax !== undefined) {
          filters.price.$lte = params.priceMax;
        }
      }

      // Realizamos la búsqueda con los filtros
      const query = this.productModel.find(filters);

      // Si se proporciona un límite, lo aplicamos
      if (params?.limit !== undefined) {
        query.limit(params.limit);
      }

      // Si se proporciona un offset, lo aplicamos
      if (params?.offset !== undefined) {
        query.skip(params.offset);
      }

      query.populate('manufacturer');

      return await query.populate('manufacturer').exec();
    } catch (error) {
      throw new Error(`Error retrieving products: ${error.message}`);
    }
  }

  async findOne(id: string): Promise<Product> {
    try {
      const product = await this.productModel.findById(id).exec();
      if (!product) {
        throw new NotFoundException(`Product with ID ${id} not found.`);
      }
      return product;
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new BadRequestException(`Invalid ID format: ${id}`);
      }
      throw new Error(`Error finding product: ${error.message}`);
    }
  }

  async update(id: string, changes: UpdateProductDto): Promise<Product> {
    try {
      const updatedProduct = await this.productModel
        .findByIdAndUpdate(id, { $set: changes }, { new: true })
        .exec();
      if (!updatedProduct) {
        throw new NotFoundException(`Product with ID ${id} not found.`);
      }
      return updatedProduct;
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new BadRequestException(`Invalid ID format: ${id}`);
      }
      throw new Error(`Error updating product: ${error.message}`);
    }
  }

  async remove(id: string): Promise<Product> {
    try {
      const deletedProduct = await this.productModel
        .findByIdAndDelete(id)
        .exec();
      if (!deletedProduct) {
        throw new NotFoundException(`Product with ID ${id} not found.`);
      }
      return deletedProduct;
    } catch (error) {
      if (error.kind === 'ObjectId') {
        throw new BadRequestException(`Invalid ID format: ${id}`);
      }
      throw new Error(`Error deleting product: ${error.message}`);
    }
  }
}
