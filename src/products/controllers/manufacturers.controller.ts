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
import { ManufacturersService } from '../services/manufacturers.service';
import { CreateManufacturerDto } from '../dtos/CreateManufacturerDTO';
import { UpdateManufacturerDto } from '../dtos/UpdateManufacturerDto';

@ApiTags('Manufacturers')
@Controller('manufacturers')
export class ManufacturersController {
  constructor(private manufacturersService: ManufacturersService) {}

  @ApiOperation({ summary: 'Get all manufacturers' })
  @Get()
  getAllManufacturers() {
    return this.manufacturersService.findAll();
  }

  @Get(':idManufacturer')
  @HttpCode(HttpStatus.ACCEPTED)
  @ApiOperation({ summary: 'Get a manufacturer by ID' })
  getManufacturer(
    @Param('idManufacturer', ParseIntPipe) idManufacturer: number,
  ) {
    return this.manufacturersService.findOne(idManufacturer);
  }

  @Post()
  @ApiOperation({ summary: 'Create a new manufacturer' })
  createManufacturer(@Body() payload: CreateManufacturerDto) {
    return this.manufacturersService.create(payload);
  }

  @Put('/:id')
  @ApiOperation({ summary: 'Update an existing manufacturer' })
  updateManufacturer(
    @Param('id') id: string,
    @Body() payload: UpdateManufacturerDto,
  ) {
    return this.manufacturersService.update(+id, payload);
  }

  @Delete('/:id')
  @ApiOperation({ summary: 'Delete a manufacturer by ID' })
  deleteManufacturer(@Param('id', ParseIntPipe) id: number) {
    this.manufacturersService.remove(id);
  }
}
