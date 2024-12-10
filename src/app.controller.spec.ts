// import { Test, TestingModule } from '@nestjs/testing';
// import { INestApplication } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
// import { ConfigModule } from '@nestjs/config';
// import { DatabaseModule } from './database/database.module'; // Assuming you have a DatabaseModule
// import * as request from 'supertest';

// describe('AppController', () => {
//   let app: INestApplication;

//   beforeEach(async () => {
//     const moduleRef = await Test.createTestingModule({
//       imports: [ConfigModule.forRoot(), DatabaseModule],
//       controllers: [AppController],
//       providers: [AppService],
//     }).compile();

//     app = moduleRef.createNestApplication();
//     await app.init();
//   });

//   afterEach(async () => {
//     await app.close();
//   });

//   describe('root', () => {
//     it('should return "Hello World!"', async () => {
//       const response = await request(app.getHttpServer()).get('/').expect(200);

//       expect(response.body).toBe('Hello World!');
//     });
//   });
// });
