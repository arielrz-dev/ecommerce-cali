import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrderService } from '../services/orders.service';
import { addProductsToOrderDto, CreateOrderDto } from '../dtos/CreateOrderDto';
import { UpdateOrderDto } from '../dtos/UpdateOrderDTO';
import { MongoIdPipe } from 'src/common/mongo-id.pipe';
import { FilterOrderDto } from '../entities/orders.entity';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrderService) {}

  @ApiOperation({ summary: 'Get all orders' })
  @Get()
  getAllOrders(@Query() filterDto?: FilterOrderDto) {
    return this.ordersService.findAll(filterDto);
  }

  @ApiOperation({ summary: 'Get an order by ID' })
  @Get('/:id')
  getOrder(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new order' })
  @Post()
  createOrder(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  // @ApiOperation({ summary: 'Update an existing order' })
  // @Put('/:id')
  // updateOrder(
  //   @Param('id', MongoIdPipe) id: string,
  //   @Body() payload: UpdateOrderDto,
  // ) {
  //   return this.ordersService.update(id, payload);
  // }

  @ApiOperation({ summary: 'Delete an order by ID' })
  @Delete('/:id')
  deleteOrder(@Param('id', MongoIdPipe) id: string) {
    return this.ordersService.delete(id);
  }

  @ApiOperation({ summary: 'Add products to an order' })
  @Put('/:id/products')
  addProducts(
    @Param('id', MongoIdPipe) id: string,
    @Body() payload: addProductsToOrderDto,
  ) {
    return this.ordersService.addProduct(id, payload.productsIds);
  }

  @ApiOperation({ summary: 'Remove a product from an order' })
  @Delete('/:id/products/:productId')
  removeProduct(
    @Param('id', MongoIdPipe) id: string,
    @Param('productId', MongoIdPipe) productId: string,
  ) {
    return this.ordersService.removeProduct(id, productId);
  }
}
