import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesService } from './services/categories.service';
import { ManufacturersService } from 'src/products/services/manufacturers.service';
import { ManufacturersController } from 'src/products/controllers/manufacturers.controller';
import { CategoriesController } from 'src/products/controllers/categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/Product.entity';
import { Category } from './entities/Category.entity';
import { Manufacturer } from './entities/manufacturer.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Product, Category, Manufacturer])],
  controllers: [
    ProductsController,
    ManufacturersController,
    CategoriesController,
  ],
  providers: [ProductsService, CategoriesService, ManufacturersService],
  exports: [ProductsService],
})
export class ProductsModule {}
