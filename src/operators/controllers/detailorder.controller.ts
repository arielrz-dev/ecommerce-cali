import { Body, Controller, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { CreateDetailOrderDto } from '../dtos/CreateDetailOrderDto';
import { DetailOrderService } from '../services/detail-order.service';

@ApiTags('DetailOrder')
@Controller('detailorder')
export class DetailOrderController {
  constructor(private detailOrderService: DetailOrderService) {}

  @Post()
  createDetailOrder(@Body() payload: CreateDetailOrderDto) {
    return this.detailOrderService.create(payload);
  }
}
