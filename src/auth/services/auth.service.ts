import { Injectable } from '@nestjs/common';
import { Operator } from 'src/operators/entities/operator.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { OperatorsService } from '../../operators/services/operators.service';

@Injectable()
export class AuthService {
  constructor(
    private operatorsService: OperatorsService,
    private jwtService: JwtService,
  ) {}

  async validateUser(
    email: string,
    password: string,
  ): Promise<Operator | null> {
    const operator = await this.operatorsService.findByEmail(email);
    const isMatch = await bcrypt.compare(password, operator.password);
    if (operator && isMatch) {
      return operator;
    }
    return null;
  }

  generateJWT(operator: Operator) {
    const payload = {
      role: operator.role,
      sub: operator.id,
    };
    return {
      access_token: this.jwtService.sign(payload),
      operator,
    };
  }
}
