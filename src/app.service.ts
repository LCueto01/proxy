import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  printBruh(): string {
    return 'Bruh';
  }
}
