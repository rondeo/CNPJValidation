import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { CnpjModule } from '../../src/modules/cnpj/Cnpj.module';
import { CnpjService } from '../../src/modules/cnpj/Cnpj.service';

describe('Cnpj', () => {
  const cnpjService = { findAll: () => ['test'] };
  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [CnpjModule],
    })
      .overrideProvider(CnpjService)
      .useValue(cnpjService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET Cnpj`, () => {
    return request(app.getHttpServer())
      .get('/Cnpj/')
      .expect(200)
      .expect({
        data: cnpjService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
