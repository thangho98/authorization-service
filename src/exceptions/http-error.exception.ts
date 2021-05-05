import { HttpException } from '@nestjs/common/exceptions/http.exception';
import { ErrorCode } from '@cores/types';

export class HttpErrorException extends HttpException {
  constructor(error: ErrorCode) {
    super(
      {
        code: error.code,
        message: error.message,
      },
      error.status,
    );
  }
}
