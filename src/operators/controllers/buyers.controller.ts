import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Buyers')
@Controller('buyers')
export class BuyersController {}
