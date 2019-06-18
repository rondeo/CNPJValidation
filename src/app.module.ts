import { Module } from '@nestjs/common';
import { CnpjModule } from './modules/cnpj/cnpj.module';
import { CommonModule } from './common/common.module';
import { RedisService } from './common/services/redis-service';
import { SintegraModule } from './modules/sintegra/sintegra.module';

@Module({
  imports: [CommonModule, CnpjModule, RedisService, SintegraModule],
})
export class ApplicationModule {}
