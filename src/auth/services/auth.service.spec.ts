import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { AuthService } from './auth.service';
import { JwtService } from '@nestjs/jwt';
import { OperatorsService } from '../../operators/services/operators.service';
import { Operator } from '../../operators/entities/operator.entity';
import { mock, MockProxy } from 'jest-mock-extended';
import { Model } from 'mongoose';

describe('AuthService', () => {
  let service: AuthService;
  let operatorModel: MockProxy<Model<Operator>>;
  let operatorsService: MockProxy<OperatorsService>;

  beforeEach(async () => {
    operatorModel = mock<Model<Operator>>();
    operatorsService = mock<OperatorsService>();

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        JwtService,
        {
          provide: getModelToken(Operator.name),
          useValue: operatorModel,
        },
        {
          provide: OperatorsService,
          useValue: operatorsService,
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
