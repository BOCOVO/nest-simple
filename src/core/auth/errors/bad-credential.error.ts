import { BadRequestException } from '@nestjs/common';
import { AccountErrorCode } from '../enums/error-code.enum';

export class BadCredentialError extends BadRequestException {
  constructor() {
    super({
      code: AccountErrorCode.BAD_CREDENTIAL,
      message: 'Wrong password or email',
    });
  }
}
