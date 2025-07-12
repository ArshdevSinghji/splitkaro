import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Group } from './entities/group.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { UserService } from 'src/user/user.service';
import { CreateGroupDto } from './dto/create-group.dto';

@Injectable()
export class GroupService {
  constructor(
    @InjectRepository(Group)
    private groupRepo: Repository<Group>,
    private userService: UserService,
  ) {}

  async findOne(groupName: string) {
    return await this.groupRepo.findOne({
      where: { groupName },
    });
  }

  async findAll(email: string) {
    return await this.groupRepo.find({
      where: { owner: { email } },
    });
  }

  async create(email: string, createGroupDto: CreateGroupDto) {
    const owner = await this.userService.findOne(email);
    if (!owner) {
      throw new Error('Owner not found');
    }
    const group = this.groupRepo.create({
      groupName: createGroupDto.groupName,
      owner,
    });
    return await this.groupRepo.save(group);
  }
}
