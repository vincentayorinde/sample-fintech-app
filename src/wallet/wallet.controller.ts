import { Body, Controller, Post } from '@nestjs/common';
import { WalletService } from './wallet.service';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}
  @Post('transfer')
  walletTransfer(
    @Body()
    transferDto: {
      fromWalletID: string;
      toWalletID: string;
      amount: number;
    },
  ) {
    return this.walletService.walletTransfer(transferDto);
  }

  @Post('withdraw')
  withdrawToBank(
    @Body()
    withDrawDto: {
      walletID: string;
      bankAccount: string;
      amount: number;
    },
  ) {
    return this.walletService.withdrawToBank(withDrawDto);
  }
}
