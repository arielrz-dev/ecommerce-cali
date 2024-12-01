import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { AppService } from './app.service';
import { ApiExcludeController } from '@nestjs/swagger';
import { Db } from 'mongodb';

@ApiExcludeController()
@Controller()
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

  @Get('tasks')
  tasks() {
    const tasksCollection = this.database.collection('tasks');
    return tasksCollection.find().toArray();
  }
}
