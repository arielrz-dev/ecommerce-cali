import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Product } from '../entities/Product.entity';
import { CreateProductDto } from '../dtos/CreateProductDTO';
import { UpdateProductDto } from '../dtos/UpdateProductDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const existingProduct = await this.productRepository.findOne({
      where: { name: createProductDto.name },
    });
    if (existingProduct) {
      throw new ConflictException(
        `Product with name ${createProductDto.name} already exists`,
      );
    }
    const newProduct = this.productRepository.create(createProductDto);
    return await this.productRepository.save(newProduct);
  }

  async findAll(page: number = 1, pageSize: number = 10): Promise<Product[]> {
    return await this.productRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    return product;
  }

  async update(
    id: number,
    updateProductDto: UpdateProductDto,
  ): Promise<Product> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    const updatedProduct = this.productRepository.merge(
      product,
      updateProductDto,
    );
    return await this.productRepository.save(updatedProduct);
  }

  async remove(id: number): Promise<void> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.productRepository.remove(product);
  }

  //realiza un borrado logico del producto
  async softDelete(id: number): Promise<void> {
    const productToRemove = await this.productRepository.findOne({
      where: { id },
    });
    if (!productToRemove) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }
    await this.productRepository.softRemove(productToRemove);
  }

  //devuelve todos los productos + los de borrado logico
  async findAllWithDeleted(): Promise<Product[]> {
    return await this.productRepository.find({ withDeleted: true });
  }
}
