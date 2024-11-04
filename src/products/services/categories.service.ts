import {
  Injectable,
  NotFoundException,
  ConflictException,
} from '@nestjs/common';
import { Category } from '../entities/Category.entity';
import { CreateCategoryDto } from '../dtos/CreateCategoryDTO';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UpdateCategoryDto } from '../dtos/UpdateCategoryDTO';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) {}

  async create(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const existingCategory = await this.categoryRepository.findOne({
      where: { name: createCategoryDto.name },
    });
    if (existingCategory) {
      throw new ConflictException(
        `Category with name ${createCategoryDto.name} already exists`,
      );
    }
    const newCategory = this.categoryRepository.create(createCategoryDto);
    return await this.categoryRepository.save(newCategory);
  }

  async findAll(page: number = 1, pageSize: number = 10): Promise<Category[]> {
    return await this.categoryRepository.find({
      skip: (page - 1) * pageSize,
      take: pageSize,
      order: { name: 'ASC' },
    });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }

    const updatedCategory = this.categoryRepository.merge(
      category,
      updateCategoryDto,
    );
    return await this.categoryRepository.save(updatedCategory);
  }

  async remove(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne({ where: { id } });
    if (!category) {
      throw new NotFoundException(`Category with id ${id} not found`);
    }
    await this.categoryRepository.remove(category);
  }
}
