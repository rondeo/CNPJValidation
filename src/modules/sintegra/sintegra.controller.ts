import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { RolesGuard } from '../../common/guards/roles.guard';
import { LoggingInterceptor } from '../../common/interceptors/logging.interceptor';
import { TransformInterceptor } from '../../common/interceptors/transform.interceptor';
import { SintegraService } from './sintegra.service';
import { CnpjValidationPipe } from '../../common/pipes/cnpj-validation.pipe';

@Controller('sintegra')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class SintegraController {
  constructor(private readonly sintegraService: SintegraService) {}
  @Get(':cnpj')
  async findAll( @Param('cnpj', new CnpjValidationPipe()) cnpj ): Promise<any> {
    return this.sintegraService.find(cnpj);
  }
}
