import { Module } from '@nestjs/common';
import { ManufacturersController } from './controllers/manufacturers.controller';
import { ManufacturersService } from './services/manufacturers.service';

@Module({
  controllers: [ManufacturersController],
  providers: [ManufacturersService],
})
export class UsersModule {}
