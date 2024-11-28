import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Put,
  HttpCode,
  HttpStatus,
  Post,
  Query,
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { UpdateProductDto } from '../dtos/UpdateProductDTO';
import { CreateProductDto, FilterProductsDto } from '../dtos/CreateProductDTO';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { Filter } from 'aws-sdk/clients/devicefarm';
import { Product } from '../entities/Product.entity';

@ApiTags('Products')
@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @ApiOperation({ summary: 'Get all products' })
  @Get()
  async getAllProducts(@Query() params: FilterProductsDto): Promise<Product[]> {
    return await this.productsService.findAll(params);
  }

  // @ApiOperation({ summary: 'Get a filtered list of products' })
  // @Get()
  // getProducts() {
  //   // @Query('brand') brand = '', @Query('offset') offset = 0, @Query('limit') limit = 100,
  //   return this.productsService.findAll();
  // }

  @ApiOperation({ summary: 'Get all products including soft-deleted ones' })
  @Get('all-with-deleted')
  getAllProductsWithDeleted() {
    return this.productsService.findAllWithDeleted();
  }

  @ApiOperation({ summary: 'Get a product by ID' })
  @Get(':idProduct')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('idProduct', ParseIntPipe) idProduct: number) {
    return this.productsService.findOne(idProduct);
  }

  @ApiOperation({ summary: 'Create a new product' })
  @Post()
  createProduct(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @ApiOperation({ summary: 'Update a product by ID' })
  @Put('/:id')
  updateProduct(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(+id, payload);
  }

  @ApiOperation({ summary: 'Soft delete a product by ID' })
  @Delete('soft/:id')
  softDeleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.softDelete(id);
  }

  @ApiOperation({ summary: 'Delete a product by ID' })
  @Delete('/:id')
  deleteProduct(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }

  @Put(':id/category/:categoryId')
  addCategoryToProduct(
    @Param('id') id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.addCategoryToProduct(id, categoryId);
  }

  @Delete(':id/category/:categoryId')
  removeCategoryFromProduct(
    @Param('id') id: number,
    @Param('categoryId', ParseIntPipe) categoryId: number,
  ) {
    return this.productsService.removeCategoryByProduct(id, categoryId);
  }
}
