import { Injectable } from '@nestjs/common';
import { Operator } from 'src/operators/entities/operator.entity';
import { OperatorsService } from 'src/operators/services/operators.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private operatorsService: OperatorsService) {}

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
}
