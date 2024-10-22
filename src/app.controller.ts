import { Controller, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import config from './config';

@Controller()
export class AppController {
  //constructor(private readonly appService: AppService) {}
  constructor(
    @Inject(config.KEY) private configService: ConfigType<typeof config>,
  ) {}

  getEnvs(): string {
    const apiKey = this.configService.apiKey;
    const name = this.configService.database.name;
    return `Envs:${apiKey} ${name}`;
  }
}
