import { Module } from '@nestjs/common';
import { OperatorsController } from './controllers/operators.controller';
import { OperatorsService } from './services/operators.service';

@Module({
  controllers: [OperatorsController],
  providers: [OperatorsService],
})
export class OperatorsModule {}
