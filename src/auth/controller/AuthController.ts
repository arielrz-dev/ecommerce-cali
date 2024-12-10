import { Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Request } from 'express';
import { Operator } from 'src/operators/entities/operator.entity';
import { AuthService } from '../services/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @UseGuards(AuthGuard('local'))
  @Post('/login')
  login(@Req() req: Request) {
    const operator = req.user as Operator;
    return this.authService.generateJWT(operator);
  }
}
