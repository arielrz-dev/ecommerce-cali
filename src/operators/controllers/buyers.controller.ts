import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { BuyersService } from '../services/buyers.service';
import { CreateBuyerDto } from '../dtos/CreateBuyerDTO';
import { UpdateBuyerDto } from '../dtos/UpdateBuyerDto';

@ApiTags('Buyers')
@Controller('buyers')
export class BuyersController {
  constructor(private buyersService: BuyersService) {}

  @ApiOperation({ summary: 'Get all buyers' })
  @Get()
  getAllBuyers() {
    return this.buyersService.findAll();
  }

  @Get(':idBuyer')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Get a buyer by ID' })
  getBuyer(@Param('idBuyer', ParseIntPipe) idBuyer: number) {
    return this.buyersService.findOne(idBuyer);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new buyer' })
  createBuyer(@Body() payload: CreateBuyerDto) {
    return this.buyersService.create(payload);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing buyer' })
  updateBuyer(@Param('id') id: string, @Body() payload: UpdateBuyerDto) {
    return this.buyersService.update(+id, payload);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a buyer by ID' })
  deleteBuyer(@Param('id', ParseIntPipe) id: number) {
    this.buyersService.remove(id);
  }
}
