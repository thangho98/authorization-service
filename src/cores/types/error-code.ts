import { HttpStatus } from '@nestjs/common';

export interface ErrorCode {
  code: number;
  status: HttpStatus;
  message: string;
}
