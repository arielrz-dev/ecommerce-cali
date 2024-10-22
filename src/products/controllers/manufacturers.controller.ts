import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Manufacturers')
@Controller('manufacturers')
export class ManufacturersController {}
