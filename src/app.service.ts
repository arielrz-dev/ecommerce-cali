import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AppService {
  configService: any;
  constructor(
    // @Inject('TAREA ASINC') private tarea: any[],
    private config: ConfigService,
  ) {}

  // getHello(): string {
  //   // return 'Hello World!';
  //   const apiKey = this.configService.get('API_KEY');
  //   const dbname = this.configService.get('DATABASE_NAME');
  //   return ` La llave de la aplicaciones es: ${apiKey} , y el nombre de la base de datos ${dbname}`;
  // }
}
