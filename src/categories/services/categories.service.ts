import { Injectable, NotFoundException } from '@nestjs/common';
import { Category } from '../entities/Category.entity';
import { CreateCategoryDto } from '../dtos/CreateCategoryDTO';

@Injectable()
export class CategoriesService {
  private categories: Category[] = [
    { id: 1, name: 'Electronics', description: 'Consumer electronic devices' },
    { id: 2, name: 'Computers', description: 'Computers and accessories' },
    { id: 3, name: 'Video games', description: 'Consoles and video games' },
    {
      id: 4,
      name: 'Audio',
      description: 'Headphones, speakers and other audio devices',
    },
    {
      id: 5,
      name: 'Image and sound',
      description: 'Televisions, projectors and cameras',
    },
    { id: 6, name: 'Telephony', description: 'Mobile phones and accessories' },
    { id: 7, name: 'Smart home', description: 'Smart home devices' },
    {
      id: 8,
      name: 'Photography',
      description: 'Cameras, lenses and accessories',
    },
    {
      id: 9,
      name: 'Wearables',
      description:
        'Smartwatches, activity bracelets and other wearable devices',
    },
    {
      id: 10,
      name: 'Accessories',
      description: 'Chargers, cables, cases and other accessories',
    },
  ];

  create(createCategoryDto: CreateCategoryDto): Category {
    const newCategoryId = this.categories.length
      ? Math.max(...this.categories.map((p) => p.id)) + 1
      : 1;

    const newCategory: Category = {
      id: newCategoryId,
      ...createCategoryDto,
    };

    this.categories.push(newCategory);
    return newCategory;
  }

  findAll() {
    return this.categories;
  }

  findOne(id: number): Category {
    const category = this.categories.find((item) => item.id === id);
    if (!category) {
      throw new NotFoundException(`Category with id ${id} is not found`);
    }
    return category;
  }

  update(id: number, payload: any): void {
    const categoryIndex = this.categories.findIndex(
      (product) => product.id === id,
    );

    if (categoryIndex !== -1) {
      const updatedProduct = {
        ...this.categories[categoryIndex],
        ...payload,
      };

      this.categories.splice(categoryIndex, 1, updatedProduct);
    } else {
      console.warn(`Category with ID ${id} not found.`);
    }
  }

  remove(id: number) {
    const index = this.categories.findIndex((category) => category.id === id);
    if (index !== -1) {
      this.categories.splice(index, 1);
      return true;
    } else {
      throw new NotFoundException(
        `Category with ID ${id} not found in the array`,
      );
    }
  }
}
