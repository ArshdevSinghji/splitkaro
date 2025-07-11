import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { HashService } from 'src/hash/hash.service';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private hashService: HashService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, password: string) {
    const user = await this.userService.findOne(email);
    if (!user) throw new BadRequestException('user does not exists!');

    const isMatch = await this.hashService.comparingPasswordWithHash(
      password,
      user.password,
    );

    if (!isMatch) throw new BadRequestException("credentails don't match");

    const payload = { email: user.email, username: user.username };

    return {
      message: 'sign in successful!',
      access_token: await this.jwtService.signAsync(payload),
    };
  }

  async signUp(createUserDto: CreateUserDto) {
    const user = await this.userService.findOne(createUserDto.email);

    if (user) throw new BadRequestException('user already exists!');

    return await this.userService.create(createUserDto);
  }
}
