import { Body, Controller, Delete, Param, Put } from '@nestjs/common';
//import { ProductsService } from '../services/products.service';

@Controller('products')
export class ProductsController {
  //constructor(private readonly productsService: ProductsService) {}
  createProduct(@Body() payload: any) {
    return {
      message: 'accion de crear',
      payload,
    };
  }

  @Put('/:idProduct')
  updateProduct(@Param('idProduct') idProduct: string, @Body() body: any): any {
    return {
      idProduct: idProduct,
      nameProduct: body.name,
      price: body.price,
    };
  }

  @Delete('idProduct')
  deleteProduct(@Param('idProduct') idProduct: string): any {
    return {
      idProduct: idProduct,
      delete: true,
      count: 1,
    };
  }
}
