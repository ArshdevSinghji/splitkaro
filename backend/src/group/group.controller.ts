import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Query,
} from '@nestjs/common';
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

  @Get('user/:email')
  async findAll(@Param('email') email: string) {
    return await this.groupService.findAll(email);
  }

  @Get('name/:groupName')
  async findOne(@Param('groupName') groupName: string) {
    return await this.groupService.findOne(groupName);
  }

  @Post('addMember')
  async addFriend(
    @Query('groupName') groupName: string,
    @Body() body: { email: string; members: string[] },
  ) {
    return await this.groupService.addFriend(
      groupName,
      body.email,
      body.members,
    );
  }

  @Delete('deleteMember')
  async deleteMember(
    @Query('groupName') groupName: string,
    @Body() email: string,
  ) {
    return await this.groupService.deleteMember(groupName, email);
  }
}
