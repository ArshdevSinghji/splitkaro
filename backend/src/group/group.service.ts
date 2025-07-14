import { BadRequestException, Injectable } from '@nestjs/common';
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
      relations: ['owner', 'expense'],
    });
  }

  async findAll(email: string) {
    return await this.groupRepo.find({
      where: { owner: { email } },
      relations: ['owner', 'expense'],
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

  async addFriend(groupName: string, email: string, members: string[]) {
    const group = await this.findOne(groupName);
    if (!group) {
      throw new Error(`Group with name ${groupName} not found`);
    }

    const user = await this.userService.findOne(email);
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    group.groupMember = members.join(', ');
    return await this.groupRepo.save(group);
  }

  async deleteMember(groupName: string, email: string) {
    const group = await this.findOne(groupName);
    if (!group) {
      throw new Error(`Group with name ${groupName} not found`);
    }

    const user = await this.userService.findOne(email);
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }

    if (group.owner.email === email) {
      throw new BadRequestException(`Cannot remove the owner from the group`);
    }

    const members = group.groupMember
      .split(',')
      .filter((member) => member !== email);

    group.groupMember = members.join(',');
    return await this.groupRepo.save(group);
  }
}
