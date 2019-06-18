import { Module } from '@nestjs/common';
import { SintegraController } from './sintegra.controller';
import { SintegraService } from './sintegra.service';
import { HttpService } from '../common/services/http-service';
import { RedisService } from '../common/services/redis-service';

@Module({
  controllers: [SintegraController],
  providers: [RedisService, SintegraService, HttpService],
})
export class SintegraModule {}
