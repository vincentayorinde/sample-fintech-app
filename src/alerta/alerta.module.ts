import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { AlertaService } from './alerta.service';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [HttpModule.register({ timeout: 5000, maxRedirects: 5 })],
  providers: [AlertaService, ConfigService],
  exports: [AlertaService],
})
export class AlertaModule {}
