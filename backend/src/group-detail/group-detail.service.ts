import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { GroupDetail } from './entity/groupDetail.entity';
import { Repository } from 'typeorm';
import { CreateGroupDetailDto } from './dto/create-group-detail.dto';
import { GroupService } from 'src/group/group.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class GroupDetailService {
  constructor(
    @InjectRepository(GroupDetail)
    private groupDetailRepo: Repository<GroupDetail>,
    private groupService: GroupService,
  ) {}

  async create(groupName: string, createGroupDetailDto: CreateGroupDetailDto) {
    // const { userEmails } = createGroupDetailDto;

    const group = await this.groupService.findOne(groupName);
    if (!group) throw new BadRequestException('group not found!');

    const groupCreated = this.groupDetailRepo.create({
      ...createGroupDetailDto,
      group,
    });
    return await this.groupDetailRepo.save(groupCreated);
  }
}
