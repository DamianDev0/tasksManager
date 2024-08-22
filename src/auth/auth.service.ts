import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UsersService,
  ) {}

  async register(registerDto: RegisterDto) {
    const user = await this.userService.findOneByEmail(registerDto.email);

    if (user) {
      throw new BadRequestException('Email already exists');
    }

    return this.userService.create(registerDto);
  }

  async login({ email, password }: LoginDto) {
    const user = await this.userService.findUserWithPassword(email);

    if (!user) {
      throw new BadRequestException('Invalid credentials');
    }

    const validPassword = await bcrypt.compare(password, user.password);

    if (!validPassword) {
      throw new BadRequestException('Invalid credentials');
    }

    const payload = { id: user.id, email: user.email };
    const accesToken = this.jwtService.sign(payload);

    return {
      email: user.email,
      accessToken: accesToken,
    };
  }
}
