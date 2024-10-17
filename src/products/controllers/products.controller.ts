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
} from '@nestjs/common';
import { ProductsService } from '../services/products.service';
import { ParseIntPipe } from '../../common/parse-int.pipe';
import { UpdateProductDto } from '../dtos/UpdateProductDTO';
import { CreateProductDto } from '../dtos/CreateProductDTO';

@Controller('products')
export class ProductsController {
  constructor(private productsService: ProductsService) {}

  @Get()
  getAllProducts() {
    return this.productsService.findAll();
  }

  @Get()
  getProducts() {
    //@Query('brand') brand = '', //@Query('offset') offset = 0, //@Query('limit') limit = 100,
    return this.productsService.findAll();
  }

  @Get(':idProduct')
  @HttpCode(HttpStatus.ACCEPTED)
  getProduct(@Param('idProduct', ParseIntPipe) idProduct: number) {
    return this.productsService.findOne(idProduct);
  }

  @Post()
  createProduct(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);
  }

  @Put('/:id')
  updateProduct(@Param('id') id: string, @Body() payload: UpdateProductDto) {
    return this.productsService.update(+id, payload);
  }

  @Delete('/:id')
  deleteProduct(@Param('id') id: string) {
    this.productsService.remove(+id);
  }
}
