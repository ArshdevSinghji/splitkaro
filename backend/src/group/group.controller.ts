import { Body, Controller, Param, Post } from '@nestjs/common';
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
}
