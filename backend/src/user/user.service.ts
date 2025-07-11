import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { HashService } from 'src/hash/hash.service';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
    private hashService: HashService,
  ) {}

  async create(createUserDto: CreateUserDto) {
    createUserDto.password =
      await this.hashService.generateSaltAndHashingPassword(
        createUserDto.password,
      );
    const user = this.userRepository.create(createUserDto);
    return await this.userRepository.save(user);
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findOne(email: string) {
    return this.userRepository.findOne({
      where: { email },
      relations: ['groups', 'groups.groupDetail', 'expense'],
    });
  }

  async update(email: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update({ email }, updateUserDto);
  }

  async remove(email: string) {
    const user = await this.findOne(email);
    if (!user) {
      throw new Error(`User with email ${email} not found`);
    }
    return await this.userRepository.remove(user);
  }
}
