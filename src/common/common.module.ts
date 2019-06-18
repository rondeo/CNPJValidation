import { Module } from '@nestjs/common';
import { HttpService } from './services/http-service';

@Module({
  providers: [HttpService],
})
export class CommonModule {}
