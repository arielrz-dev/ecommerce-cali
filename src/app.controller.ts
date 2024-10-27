import { Controller, Get, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';
import { AppService } from './app.service';

@Controller()
export class AppController {
  //constructor(private readonly appService: AppService) {}
  constructor(
    private readonly appService: AppService,
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  @Get()
  getHello(): string {
    const apiKey = this.configService.apiKey;
    const name = this.configService.database.name;
    const dbport = this.configService.database.port;
    return `La llave de la aplicacion es :${apiKey}, y el nombre y puerto de la bd: ${name}, ${dbport}`;
  }

  @Get('usefactory')
  GetUseFactory(): string {
    return this.appService.getUseFactory();
  }
}
