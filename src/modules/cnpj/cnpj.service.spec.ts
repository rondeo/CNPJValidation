import { Test } from '@nestjs/testing';
import { CnpjController } from './cnpj.controller';
import { CnpjService } from './cnpj.service';
import { cnpj } from './interfaces/cnpj.interface';

describe('CnpjController', () => {
  let cnpjService: CnpjService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CnpjController],
      providers: [CnpjService],
    }).compile();

    cnpjService = module.get<CnpjService>(CnpjService);
  });

  describe('find', () => {
    it('should return an Cnpj', async () => {
      const result: cnpj[] = [
        {
          age: 2,
          breed: 'Bombay',
          name: 'Pixel',
        },
      ];
      expect(await cnpjService.find('32316159000106')).toBe(result);
    });
  });
});
