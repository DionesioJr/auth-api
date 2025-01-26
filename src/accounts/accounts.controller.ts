import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { AccountsService } from './accounts.service';
import { UpdateAccountDto } from './dto/update-account.dto';
import { CreateAccountRequestDto } from './dto/create-account-request.dto';

@Controller('accounts')
export class AccountsController {
  constructor(private readonly accountsService: AccountsService) {}

  @Post()
  create(@Body() createAccountRequestDto: CreateAccountRequestDto) {
    return this.accountsService.create(createAccountRequestDto);
  }

  @Get()
  findAll() {
    return this.accountsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.accountsService.findOne(+id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() updateAccountDto: UpdateAccountDto) {
    return this.accountsService.update(+id, updateAccountDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.accountsService.remove(+id);
  }

  @Get(':accountId/users')
  findUsersByAccount(@Param('accountId') accountId: string) {
    return this.accountsService.findUsersByAccount(+accountId);
  }
}
