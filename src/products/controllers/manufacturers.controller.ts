import { Controller, Get } from '@nestjs/common';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { ManufacturersService } from '../services/manufacturers.service';

@ApiTags('Manufacturers')
@Controller('manufacturers')
export class ManufacturersController {
  constructor(private manufacturersService: ManufacturersService) {}

  @ApiOperation({ summary: 'Get all manufacturers' })
  @Get()
  getAllManufacturers() {
    return this.manufacturersService.findAll();
  }
}
