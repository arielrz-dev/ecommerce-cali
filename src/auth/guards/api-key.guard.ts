import {
  Injectable,
  CanActivate,
  Inject,
  ExecutionContext,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import config from 'src/config';
import { IS_PUBLIC_KEY } from '../decorators/public.decorator';
import { Request } from 'express';

@Injectable()
export class ApiKeyGuard implements CanActivate {
  constructor(private reflector: Reflector) {}
  @Inject(config.KEY) private configService: ConfigType<typeof config>;
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    // const isPublic = this.reflector.get('isPublic', context.getHandler());
    const isPublic = this.reflector.get<boolean>(
      IS_PUBLIC_KEY,
      context.getHandler(),
    );

    if (isPublic) {
      return true;
    }
    const request = context.switchToHttp().getRequest<Request>();
    const authHeader = request.get('Authorization');
    //const isAuth = authHeader === '1234';
    const isAuth = authHeader === this.configService.apiKey;
    if (!isAuth) {
      throw new UnauthorizedException('not authorized');
    }
    return isAuth;
  }
}
