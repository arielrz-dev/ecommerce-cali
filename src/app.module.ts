import { Module } from '@nestjs/common';
import { HttpModule, HttpService } from '@nestjs/axios';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { OperatorsModule } from './operators/operators.module';
import { ConfigModule } from '@nestjs/config';
import { environments } from './environments';
import { DatabaseModule } from './database/database.module';
import config from './config';
import * as Joi from 'joi';
import { lastValueFrom } from 'rxjs';
import { MongoClient } from 'mongodb';

const uri = 'mongodb://root:123456@localhost:27017/?authMechanism=DEFAULT';

const client = new MongoClient(uri);
async function run() {
  await client.connect();
  const database = client.db('admin');
  const tasksCollection = database.collection('tasks');
  const tasks = await tasksCollection.find({}).toArray();
  console.log(tasks);
}

run();

@Module({
  imports: [
    HttpModule,
    ConfigModule.forRoot({
      envFilePath: environments[process.env.NODE_ENV] || '.env',
      load: [config],
      isGlobal: true,
      validationSchema: Joi.object({
        API_KEY: Joi.string().required(),
        DATABASE_NAME: Joi.string().required(),
        DATABASE_PORT: Joi.number().required(),
      }),
    }),
    ProductsModule,
    OperatorsModule,
    DatabaseModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: 'TAREA_ASINC',
      useFactory: async (http: HttpService) => {
        const req = await http.get(
          'https://jsonplaceholder.typicode.com/posts',
        );
        const tarea = await lastValueFrom(req);
        return tarea.data;
      },
      inject: [HttpService],
    },
  ],
})
export class AppModule {}
