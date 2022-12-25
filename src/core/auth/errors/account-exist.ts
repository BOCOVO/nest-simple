import { BadRequestException } from '@nestjs/common';
import { AccountErrorCode } from '../enums/error-code.enum';

export default class AccountAlreadyExistError extends BadRequestException {
  constructor() {
    super({
      code: AccountErrorCode.ACCOUNT_ALREADY_EXIST_ERROR,
      message: 'An account already exists with this email',
    });
  }
}
