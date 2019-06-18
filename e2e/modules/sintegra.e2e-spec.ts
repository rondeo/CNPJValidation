import { INestApplication } from '@nestjs/common';
import { Test } from '@nestjs/testing';
import * as request from 'supertest';
import { SintegraModule } from '../../src/modules/sintegra/Sintegra.module';
import { SintegraService } from '../../src/modules/sintegra/Sintegra.service';

describe('Sintegra', () => {
  const sintegraService = { findAll: () => ['test'] };

  let app: INestApplication;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      imports: [SintegraModule],
    })
      .overrideProvider(SintegraService)
      .useValue(sintegraService)
      .compile();

    app = module.createNestApplication();
    await app.init();
  });

  it(`/GET Sintegra`, () => {
    return request(app.getHttpServer())
      .get('/Sintegra')
      .expect(200)
      .expect({
        data: sintegraService.findAll(),
      });
  });

  afterAll(async () => {
    await app.close();
  });
});
