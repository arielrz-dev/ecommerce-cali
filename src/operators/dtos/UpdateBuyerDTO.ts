import { OmitType, PartialType } from '@nestjs/swagger';
import { CreateBuyerDto } from './CreateBuyerDTO';

export class UpdateBuyerDto extends PartialType(
  OmitType(CreateBuyerDto, ['name']),
) {}
