import { HttpStatus } from '@nestjs/common';
import { ErrorCode } from '@cores/types';

const ErrorCodes = {
  Unauthorized: {
    code: 100000,
    status: HttpStatus.UNAUTHORIZED,
    message: 'Unauthorized',
  },
  AccountDeactivated: {
    code: 100001,
    status: HttpStatus.BAD_REQUEST,
    message: 'The account is deactivated',
  },
  AccountDeleted: {
    code: 100002,
    status: HttpStatus.BAD_REQUEST,
    message: 'The account is deleted',
  },
  AccountNotExist: {
    code: 100003,
    status: HttpStatus.BAD_REQUEST,
    message: 'The account is not exist',
  },
  PasswordInvalid: {
    code: 100004,
    status: HttpStatus.BAD_REQUEST,
    message: 'Password invalid',
  },
};
export { ErrorCodes };
