import { PartialType, OmitType } from '@nestjs/mapped-types';
import { CreateProductDto } from './CreateProductDTO';

export class UpdateProductDto extends PartialType(
  OmitType(CreateProductDto, ['name']), // Excluir campos no actualizables como 'name'
) {}
