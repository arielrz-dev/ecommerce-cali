import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ROLES_KEY } from '../decorators/roles.decorator';
import { Role } from '../models/roles.model';
import { Reflector } from '@nestjs/core';
import { Operator } from 'src/operators/entities/operator.entity';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const roles = this.reflector.get<Role[]>(ROLES_KEY, context.getHandler());

    if (!roles) {
      return true;
    }

    const request = context.switchToHttp().getRequest();
    const operator = request.user as Operator;

    const isAuth = roles.some((role) => role === operator.role);
    if (!isAuth) {
      throw new Error('Your role is not authorized to realize this action');
    }
    return isAuth;
  }
}
