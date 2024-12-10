import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesService } from './services/categories.service';
import { ManufacturersService } from '../products/services/manufacturers.service';
import { ManufacturersController } from '../products/controllers/manufacturers.controller';
import { CategoriesController } from '../products/controllers/categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from './entities/Product.entity';
import {
  Manufacturer,
  ManufacturerSchema,
} from './entities/manufacturer.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Product.name,
        schema: ProductSchema,
      },
      { name: Manufacturer.name, schema: ManufacturerSchema },
    ]),
  ],
  controllers: [
    ProductsController,
    ManufacturersController,
    CategoriesController,
  ],
  providers: [ProductsService, CategoriesService, ManufacturersService],
  exports: [ProductsService, ManufacturersService],
})
export class ProductsModule {}
