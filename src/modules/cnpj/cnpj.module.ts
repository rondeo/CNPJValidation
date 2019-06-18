import { Module } from '@nestjs/common';
import { CnpjController } from './cnpj.controller';
import { CnpjService } from './cnpj.service';
import { HttpService } from '../../common/services/http-service';
import { RedisService } from '../../common/services/redis-service';

@Module({
  controllers: [CnpjController],
  providers: [RedisService, CnpjService, HttpService],
})
export class CnpjModule {}
