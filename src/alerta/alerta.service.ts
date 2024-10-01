import { HttpService } from '@nestjs/axios';
import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { catchError, lastValueFrom } from 'rxjs';

@Injectable()
export class AlertaService {
  private alertaUrl = this.config.get('ALERTA_URL');
  private alertaKey = this.config.get('ALERTA_KEY');

  constructor(
    private config: ConfigService,
    private httpService: HttpService,
  ) {}
  async sendAlert(alertaDto: {
    message: string;
    channel: string;
    replyTo: boolean;
  }): Promise<any> {
    const { message, channel, replyTo } = alertaDto;

    try {
      const headers = {
        secretKey: `secret ${this.alertaKey}`,
        'Content-Type': 'application/json',
      };

      const res = await lastValueFrom(
        this.httpService
          .post(
            `${this.alertaUrl}/send`,
            { message, channel, replyTo },
            {
              headers,
            },
          )
          .pipe(
            catchError((error) => {
              throw new HttpException(
                `Error fetching data from external API: ${error.message}`,
                HttpStatus.BAD_REQUEST,
              );
            }),
          ),
      );
      return res.data;
      return res.data;
    } catch (error) {
      return error;
    }
  }

  async replyAlert(alertaDto: {
    channelId: string;
    threadId: string;
    channelRef: string;
    message: string;
  }): Promise<any> {
    const { channelId, threadId, channelRef, message } = alertaDto;

    try {
      const headers = {
        secretKey: `secret ${this.alertaKey}`,
        'Content-Type': 'application/json',
      };

      const res = await lastValueFrom(
        this.httpService
          .post(
            `${this.alertaUrl}/reply`,
            { channelId, threadId, channelRef, message },
            { headers },
          )
          .pipe(
            catchError((error) => {
              throw new HttpException(
                `Error processing data from API ${error}`,
                HttpStatus.BAD_REQUEST,
              );
            }),
          ),
      );
      return res.data;
    } catch (error) {}
  }
}
