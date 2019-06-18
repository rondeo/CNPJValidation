import redis = require('redis');
import { Injectable } from '@nestjs/common';
import { config } from '../../config';
import { Tedis } from 'tedis';

@Injectable()
export class RedisService {
    configureClient() {
     return new Tedis({
        port: config.redis.port,
        host: config.redis.url,
        password: config.redis.password,
      });
    }
    async getIncrementByMasterKey(client, key, productSkuId) {
    const incrementKey = `Incr.${key}-${productSkuId}`;
    const ret = await client.get(incrementKey);
    return JSON.parse(ret);
}
    async addIncrementByMasterKey(client, key, productSkuId, value) {
    const incrementKey = `Incr.${key}-${productSkuId}`;
    await client.command('SET', incrementKey, JSON.stringify(value));
    await client.command('EXPIRE', incrementKey, config.redis.minutesToExpire );
}
}
