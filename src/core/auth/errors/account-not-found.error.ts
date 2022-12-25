import { NotFoundException } from '@nestjs/common';
import { AccountErrorCode } from '../enums/error-code.enum';

export default class AccountNotFound extends NotFoundException {
  constructor() {
    super({
      code: AccountErrorCode.ACCOUNT_NOT_FOUND,
      message: 'No accounts match this information',
    });
  }
}
