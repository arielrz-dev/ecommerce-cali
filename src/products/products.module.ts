import { Module } from '@nestjs/common';
import { ProductsService } from './services/products.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesService } from './services/categories.service';
import { ManufacturersService } from 'src/products/services/manufacturers.service';
import { ManufacturersController } from 'src/products/controllers/manufacturers.controller';
import { CategoriesController } from 'src/products/controllers/categories.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema } from './entities/Product.entity';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: 'Product',
        schema: ProductSchema,
      },
    ]),
  ],
  controllers: [
    ProductsController,
    ManufacturersController,
    CategoriesController,
  ],
  providers: [ProductsService, CategoriesService, ManufacturersService],
  exports: [ProductsService],
})
export class ProductsModule {}
