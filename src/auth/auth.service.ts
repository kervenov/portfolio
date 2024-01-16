import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { CreateUserDto } from 'src/user/dto/create-user.dto';
import { User } from 'src/user/entities/user.entity';
import * as uniqid from 'uniqid';
import * as bcrypt from 'bcrypt';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { Roles } from 'src/user/enums/roles.enum';
@Injectable()
export class AuthService {
  constructor(
    @Inject('USER_REPOSITORY') private userRepository: typeof User,
    private jwtService: JwtService,
  ) {}
  async verifyRefreshToken(token: string) {
    try {
      const decoded = await this.jwtService.verify(token);
      const newToken = this.jwtService.sign(
        { id: decoded.id },
        { expiresIn: '20m' },
      );
      return { access_token: newToken };
    } catch (error) {
      console.error('Refresh token verification failed:', error.message);
      throw new Error('Refresh token verification failed');
    }
  }
  async create(createUserDto: CreateUserDto) {
    const newUser = await this.userRepository.create({
      uuid: await uniqid(`${Roles.user}-`),
      username: createUserDto.username,
      role: Roles.user,
      password: await bcrypt.hash(createUserDto.password, 10),
    });
    const accessToken = await this.generateToken(newUser, '20m');
    const refreshToken = await this.generateToken(newUser, '7d');
    return {
      access_token: accessToken,
      refresh_token: refreshToken,
    };
  }
  async login(body: LoginUserDto) {
    const { username, password } = body;
    if (!username || !password) {
      throw new HttpException(
        'All fields must be filled!',
        HttpStatus.NOT_ACCEPTABLE,
      );
    }
    const user = await this.userRepository.findOne({
      where: { username: username },
    });
    if (!user) {
      throw new HttpException('User not found!', HttpStatus.NOT_FOUND);
    }
    if (await bcrypt.compare(user.password, password)) {
      const accessToken = this.generateToken(user, '20m');
      const refreshToken = this.generateToken(user, '7d');
      return {
        access_token: accessToken,
        refresh_token: refreshToken,
      };
    } else {
      throw new HttpException(
        'Wrong password or username!',
        HttpStatus.BAD_REQUEST,
      );
    }
  }
  async generateToken(user: User, expiresIn: string) {
    const payload = {
      id: user.uuid,
      role: user.role,
    };

    const token = await this.jwtService.sign(payload, { expiresIn: expiresIn });
    return token;
  }
}
