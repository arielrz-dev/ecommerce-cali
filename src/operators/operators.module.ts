import { Module } from '@nestjs/common';
import { OperatorsController } from './controllers/operators.controller';
import { OperatorsService } from './services/operators.service';
import { BuyersService } from './services/buyers.service';
import { ProductsModule } from 'src/products/products.module';
import { BuyersController } from 'src/buyers/controllers/buyers.controller';

@Module({
  imports: [ProductsModule],
  controllers: [OperatorsController, BuyersController],
  providers: [OperatorsService, BuyersService],
})
export class OperatorsModule {}
