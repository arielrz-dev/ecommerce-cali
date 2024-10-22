import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OperatorsService } from '../services/operators.service';

@Controller('operators')
export class OperatorsController {
  constructor(private operatorsService: OperatorsService) {}

  @Get()
  getAll() {
    return this.operatorsService.findAll();
  }
  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.operatorsService.getOrdersByUser(id);
  }
}
