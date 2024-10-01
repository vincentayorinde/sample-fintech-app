import { Injectable } from '@nestjs/common';
import { AlertaService } from 'src/alerta/alerta.service';

@Injectable()
export class WalletService {
  constructor(private readonly alertaService: AlertaService) {}

  async walletTransfer(transferDto: {
    fromWalletID: string;
    toWalletID: string;
    amount: number;
  }) {
    const { fromWalletID, toWalletID, amount } = transferDto;
    const message = `Transferred ${amount} from wallet ${fromWalletID} to wallet ${toWalletID}`;

    const alertRes = await this.alertaService.sendAlert({
      message,
      channel: 'finance',
      replyTo: true,
    });

    setTimeout(() => {
      this.alertaService.replyAlert({
        message: 'Transfer delivered!',
        threadId: alertRes.data.replyData.threadId,
        channelId: alertRes.data.replyData.channelId,
        channelRef: alertRes.data.replyData.channelRef,
      });
    }, 5000);

    return { message, success: true };
  }

  withdrawToBank(withDrawDto: {
    walletID: string;
    bankAccount: string;
    amount: number;
  }) {
    const { walletID, bankAccount, amount } = withDrawDto;
    const message = `Withdrawn ${amount} from wallet ${walletID} to bank account ${bankAccount}`;
    return { message, success: true };
  }
}
