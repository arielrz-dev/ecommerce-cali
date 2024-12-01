import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesService } from './services/categories.service';
import { ManufacturersService } from 'src/products/services/manufacturers.service';
import { ManufacturersController } from 'src/products/controllers/manufacturers.controller';
import { CategoriesController } from 'src/products/controllers/categories.controller';

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
