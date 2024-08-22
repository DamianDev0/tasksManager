import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  async create(@Body() registerDto: RegisterDto) {
    const user = await this.authService.register(registerDto);
    return {
      status: HttpStatus.CREATED,
      message: 'User registered successfully',
      user: user,
    };
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.login(loginDto);
    return {
      status: HttpStatus.OK,
      message: 'Logged in successfully',
      user: user,
    };
  }
}
