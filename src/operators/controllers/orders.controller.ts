import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
  ParseIntPipe,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { OrdersService } from '../services/orders.service';
import { CreateOrderDto } from '../dtos/CreateOrderDto';
import { UpdateOrderDto } from '../dtos/UpdateOrderDTO';

@ApiTags('Orders')
@Controller('orders')
export class OrdersController {
  constructor(private ordersService: OrdersService) {}

  @ApiOperation({ summary: 'Get all orders' })
  @Get()
  getAllOrders() {
    return this.ordersService.findAll();
  }

  @ApiOperation({ summary: 'Get an order by ID' })
  @Get(':id')
  @HttpCode(HttpStatus.ACCEPTED)
  getOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.findOne(id);
  }

  @ApiOperation({ summary: 'Create a new order' })
  @Post()
  createOrder(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @ApiOperation({ summary: 'Update an existing order' })
  @Put(':id')
  updateOrder(
    @Param('id', ParseIntPipe) id: number,
    @Body() payload: UpdateOrderDto,
  ) {
    return this.ordersService.update(id, payload);
  }

  @ApiOperation({ summary: 'Delete an order by ID' })
  @Delete(':id')
  deleteOrder(@Param('id', ParseIntPipe) id: number) {
    return this.ordersService.remove(id);
  }
}
