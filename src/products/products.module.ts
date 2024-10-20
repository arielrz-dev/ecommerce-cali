import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesService } from 'src/categories/services/categories.service';
import { ManufacturersService } from 'src/manufacturers/services/manufacturers.service';
import { ManufacturersController } from 'src/manufacturers/controllers/manufacturers.controller';
import { CategoriesController } from 'src/categories/controllers/categories.controller';

@Module({
  controllers: [
    ProductsController,
    ManufacturersController,
    CategoriesController,
  ],
  providers: [ProductsService, CategoriesService, ManufacturersService],
  exports: [ProductsService],
})
export class ProductsModule {}
