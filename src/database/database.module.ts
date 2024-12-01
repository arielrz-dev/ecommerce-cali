import { ConfigType } from '@nestjs/config';
import config from '../config';
import { MongoClient } from 'mongodb';
import { Module } from '@nestjs/common';

const APIKEY = process.env.API_KEY;
const APIKEYPROD = process.env.API_KEY_PROD;
@Module({
  providers: [
    {
      provide: 'APIKEY',
      useValue: process.env.NODE_ENV === 'prod' ? APIKEYPROD : APIKEY,
    },
    {
      provide: 'MONGO',
      useFactory: async (configService: ConfigType<typeof config>) => {
        const { connection, user, host, dbName, password, port } =
          configService.mongo;

        if (!connection || !user || !host || !dbName || !password || !port) {
          throw new Error('MongoDB configuration is incomplete');
        }

        const uri = `${connection}://${user}:${password}@${host}:${port}/?authMechanism=DEFAULT`;
        const client = new MongoClient(uri);
        await client.connect();
        return client.db(dbName);
      },
      inject: [config.KEY],
    },
  ],
  exports: ['MONGO'],
})
export class DatabaseModule {}
