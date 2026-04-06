import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import request from 'supertest';
import { AppModule } from '../src/app.module';

describe('Auth (e2e)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(new ValidationPipe({ whitelist: true }));
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('POST /auth/register', () => {
    return request(app.getHttpServer())
      .post('/auth/register')
      .send({ email: 'e2e@test.com', password: '12345678' })
      .expect(201);
  });

  it('POST /auth/login', () => {
    return request(app.getHttpServer())
      .post('/auth/login')
      .send({ email: 'e2e@test.com', password: '12345678' })
      .expect(200)
      .expect((res) => {
        expect(res.body.accessToken).toBeDefined();
      });
  });
});
