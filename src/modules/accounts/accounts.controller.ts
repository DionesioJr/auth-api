import { Controller, Get, Post, Put, Delete, Param, Body, Req, UseGuards } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { RequestCreateAccountDto } from './dto/request-create-account.dto';

@Controller()
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post('account')
  create(@Body() createAccountRequestDto: RequestCreateAccountDto) {
    return this.accountsService.create(createAccountRequestDto);
  }

  @Get('accounts')
  findAll() {
    return this.accountsService.findAll();
  }

  @Get('account/:uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.accountsService.findOne(uuid);
  }

  @Put('account/:uuid')
  update(@Param('uuid') uuid: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(uuid, updateAccountDto);
  }

  @Delete('account/:uuid')
  remove(@Param('uuid') uuid: string) {
    return this.accountsService.remove(uuid);
  }

  @Get('account/:uuid/users')
  findUsersByAccount(@Param('uuid') uuid: string) {
    return this.accountsService.findUsersByAccount(uuid);
  }

  @Get('account/me')
  findAccountWithOwner(@Req() req) {
    const userUuid = req.user.uuid;
    return this.accountsService.findAccountWithOwner(userUuid);
  }
}
