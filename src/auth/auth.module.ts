import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { OperatorsModule } from 'src/operators/operators.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controller/AuthController';

@Module({
  imports: [OperatorsModule, PassportModule],
  providers: [AuthService, LocalStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
