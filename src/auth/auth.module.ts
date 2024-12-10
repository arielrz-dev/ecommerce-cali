import { Module } from '@nestjs/common';
import { AuthService } from './services/auth.service';
import { OperatorsModule } from 'src/operators/operators.module';
import { PassportModule } from '@nestjs/passport';
import { LocalStrategy } from './strategies/local.strategy';
import { AuthController } from './controller/AuthController';
import { JwtModule } from '@nestjs/jwt';
import { ConfigType } from '@nestjs/config';
import config from 'src/config';
import { JwtStrategy } from './strategies/jwt.strategy';

@Module({
  imports: [
    OperatorsModule,
    PassportModule,
    JwtModule.registerAsync({
      useFactory: (configService: ConfigType<typeof config>) => {
        return {
          secret: configService.jwtSecret,
          signOptions: {
            expiresIn: '1d',
          },
        };
      },
      inject: [config.KEY],
    }),
  ],
  providers: [AuthService, LocalStrategy, JwtStrategy],
  controllers: [AuthController],
})
export class AuthModule {}
