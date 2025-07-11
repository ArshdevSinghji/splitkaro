import { Body, Controller, Param, Post } from '@nestjs/common';
import { CreateGroupDetailDto } from './dto/create-group-detail.dto';
import { GroupDetailService } from './group-detail.service';

@Controller('group-detail')
export class GroupDetailController {
  constructor(private readonly groupDetailService: GroupDetailService) {}

  @Post(':group')
  async create(
    @Param('group') group: string,
    @Body() createGroupDetailDto: CreateGroupDetailDto,
  ) {
    await this.groupDetailService.create(group, createGroupDetailDto);
  }
}
