import { Injectable } from '@nestjs/common';
import { HttpService } from '../../common/services/http-service';
import { config } from '../../config';
import { RedisService } from '../../common/services/redis-service';

@Injectable()
export class SintegraService {
  constructor(private readonly httpService: HttpService, private readonly redisService: RedisService) {}

  async find(Cnpj: string): Promise<any> {
    const client = this.redisService.configureClient();
    const action = `?token=${config.app.Sintegra.key}&cnpj=${Cnpj}&plugin=${config.app.Sintegra.alias}`;
    const redisData =  await this.redisService.getIncrementByMasterKey(client, config.app.Sintegra.redisKey, Cnpj);

    const res = await client.keys('*');
    console.log('ALLKEYS', res);

    if (redisData) {
      return redisData;
    }

    const  validatedCnpj = await this.httpService.get(config.app.Sintegra.baseUrl, action);

    this.redisService.addIncrementByMasterKey(client, config.app.Sintegra.redisKey, Cnpj, validatedCnpj);
    return validatedCnpj;
  }

}
