import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

@Injectable()
export class ParseIntPipe implements PipeTransform {
  transform(value: string, metadata: ArgumentMetadata): number {
    const intValue = parseInt(value, 10);
    if (isNaN(intValue)) {
      throw new BadRequestException(`Invalid integer value: ${value}`);
    }
    return intValue;
  }
}
