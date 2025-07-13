import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { queryObjects } from 'v8';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.userService.create(createUserDto);
  }

  @Get()
  async findByUsernameOrFindAll(@Query() query: { username?: string }) {
    return await this.userService.findByUsernameOrFindAll(query.username);
  }

  @Get(':email')
  async findOne(@Param('email') email: string) {
    return await this.userService.findOne(email);
  }

  @Patch(':email')
  async update(
    @Param('email') email: string,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    return this.userService.update(email, updateUserDto);
  }

  @Delete(':email')
  async remove(@Param('email') email: string) {
    return this.userService.remove(email);
  }
}
