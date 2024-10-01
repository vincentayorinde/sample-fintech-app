import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { AlertaModule } from 'src/alerta/alerta.module';

@Module({
  imports: [AlertaModule],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
