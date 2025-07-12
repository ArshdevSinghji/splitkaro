import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { GroupService } from './group.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Controller('group')
export class GroupController {
  constructor(private readonly groupService: GroupService) {}

  @Post(':email')
  async create(
    @Param('email') email: string,
    @Body() createGroupDto: CreateGroupDto,
  ) {
    return await this.groupService.create(email, createGroupDto);
  }

  @Get(':email')
  async findAll(@Param('email') email: string) {
    return await this.groupService.findAll(email);
  }

  @Get(':groupName')
  async findOne(@Param('groupName') groupName: string) {
    return await this.groupService.findOne(groupName);
  }
}
