import { Controller, Get, Param, ParseIntPipe } from '@nestjs/common';
import { OperatorsService } from '../services/operators.service';
import { ApiOperation, ApiTags } from '@nestjs/swagger';

@ApiTags('Operators')
@Controller('operators')
export class OperatorsController {
  constructor(private operatorsService: OperatorsService) {}

  @ApiOperation({ summary: 'Get all the operators' })
  @Get()
  getAll() {
    return this.operatorsService.findAll();
  }
  @ApiOperation({ summary: 'Get the orders assigned to an operator' })
  @Get(':id/orders')
  getOrders(@Param('id', ParseIntPipe) id: number) {
    return this.operatorsService.getOrdersByUser(id);
  }
}
