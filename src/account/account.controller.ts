import { Controller } from '@nestjs/common';
import { ACCOUNT_PREFIX } from '../constant/constants';
import { AccountService } from './account.service';

@Controller(ACCOUNT_PREFIX)
export class AccountController {
  constructor(private accountService: AccountService) {}
}
