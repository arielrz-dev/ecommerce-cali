import {
  Controller,
  Get,
  Inject,
  SetMetadata,
  UseGuards,
} from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { AppService } from './app.service';
import { ApiExcludeController } from '@nestjs/swagger';
import { Db } from 'mongodb';
import { ApiKeyGuard } from './auth/guards/api-key.guard';
import { Public } from './auth/decorators/public.decorator';

@ApiExcludeController()
@Controller()
@UseGuards(ApiKeyGuard)
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('MONGO') private database: Db,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @Get('usefactory')
  GetUseFactory(): string {
    return this.appService.getUseFactory();
  }

  @Get('/guards')
  getHello(): string {
    return 'method to test Guardians';
  }

  @SetMetadata('isPublic', true)
  @Get('/public')
  getPublic(): string {
    return 'route Public';
  }
  @Public()
  @Get('/tasks')
  tasks() {
    const tasksCollection = this.database.collection('tasks');
    return tasksCollection.find().toArray();
  }
}
