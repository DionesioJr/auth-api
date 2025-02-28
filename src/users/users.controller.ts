import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('user')
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get('users')
  findAll() {
    return this.usersService.findAll();
  }

  @Get('user/:uuid')
  findOne(@Param('uuid') uuid: string) {
    return this.usersService.findOne(uuid);
  }

  @Get('user/email/:email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findOneByEmail(email);
  }

  @Put('user/:uuid')
  update(@Param('uuid') uuid: string, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(uuid, updateUserDto);
  }

  @Delete('user/:uuid')
  remove(@Param('uuid') uuid: string) {
    return this.usersService.remove(uuid);
  }
}
