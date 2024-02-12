import { Controller, Post, Body, Version, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @Version('1')
  create(@Body() createAuthDto: CreateUserDto) {
    return this.authService.create(createAuthDto);
  }
  @Post('login')
  @Version('1')
  login(@Body() body: LoginUserDto) {
    return this.authService.login(body);
  }
  @Post('/:refresh')
  @Version('1')
  refresh(@Param('refresh') refreshToken: string) {
    console.log(refreshToken)
    return this.authService.verifyRefreshToken(refreshToken);
  }
}