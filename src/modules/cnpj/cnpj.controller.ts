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
import { CnpjService } from './cnpj.service';
// import { cnpj } from './interfaces/cnpj.interface';
import { CnpjValidationPipe } from '../../common/pipes/cnpj-validation.pipe';

@Controller('Cnpj')
@UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor, TransformInterceptor)
export class CnpjController {
  constructor(private readonly cnpjService: CnpjService) {}
  @Get(':cnpj')
  async findAll( @Param('cnpj', new CnpjValidationPipe()) cnpj ): Promise<any> {
    return this.cnpjService.find(cnpj);
  }
}
