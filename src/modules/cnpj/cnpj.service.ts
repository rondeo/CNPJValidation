import { Injectable } from '@nestjs/common';
import { cnpj } from './interfaces/cnpj.interface';
import { HttpService } from '../../common/services/http-service';
import { config } from '../../config';
import { RedisService } from '../../common/services/redis-service';
import { identifier } from '@babel/types';

@Injectable()
export class CnpjService {
  constructor(private readonly httpService: HttpService, private readonly redisService: RedisService) {}
  private readonly Cnpj: cnpj[] = [];

  create(Cnpj: cnpj) {
    this.Cnpj.push(Cnpj);
  }

  async find(Cnpj: string): Promise<any> {
    const client = this.redisService.configureClient();
    const action = `${config.app.CnpjApi.getCnpj}${Cnpj}/${config.app.CnpjApi.getCnpjDays}${config.app.CnpjApi.days}`;
    const redisData =  await this.redisService.getIncrementByMasterKey(client, config.app.CnpjApi.redisKey, Cnpj);

    const res = await client.keys('*');
    console.log('ALLKEYS', res);

    if (redisData) {
      return redisData;
    }

    const  validatedCnpj = await this.httpService.get(config.app.CnpjApi.baseUrl, action);

    this.redisService.addIncrementByMasterKey(client, config.app.CnpjApi.redisKey, Cnpj, validatedCnpj);
    return validatedCnpj;
  }

}
