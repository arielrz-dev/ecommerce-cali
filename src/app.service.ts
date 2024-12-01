import { Inject, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Db } from 'mongodb';
import { Client } from 'pg';

@Injectable()
export class AppService {
  configService: any;
  constructor(
    @Inject('MONGO') private database: Db,
    @Inject('TAREA_ASINC') private tarea: any[],
    private config: ConfigService,
  ) {}

  getUseFactory(): string {
    console.log(this.tarea); //se utiliza el useFactory
    return 'Realizando una tarea de ejemplo';
  }

  getTasks() {
    return this.database.collection('tasks').find().toArray();
  }
}
