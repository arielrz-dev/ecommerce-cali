import { Global, Module } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { Client } from 'pg';
import config from '../config';
import { TypeOrmModule } from '@nestjs/typeorm';

const APIKEY = 'DEV-456';
const APIKEYPROD = 'PROD-12345';

const client = new Client({
  user: 'root',
  host: 'localhost',
  database: 'my_db',
  password: '123456',
  port: 5432,
});

client.connect();
@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [config.KEY],
      useFactory: (configService: ConfigType<typeof config>) => {
        const { user, host, dbName, password, port } = configService.postgres;
        return {
          type: 'postgres',
          user,
          host,
          database: dbName,
          password,
          port,
        };
      },
    }),
  ],
  exports: ['APIKEY', 'PG', TypeOrmModule],
})
export class DatabaseModule {}
