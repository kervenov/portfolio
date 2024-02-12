import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Roles } from 'src/user/enums/roles.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const token = this.extractTokenFromHeader(request);

    if (!token) {
      throw new HttpException('Invalid or expired token!', HttpStatus.NOT_ACCEPTABLE);
    }
    try {
    const decoded = await this.jwtService.verify(token);
    if (decoded.role !== Roles.admin) {
      throw new HttpException('You do not have permission to perform this action', HttpStatus.NOT_ACCEPTABLE); 
    }
    else return true;
    } catch(error){
      throw new UnauthorizedException();
    }
}
  private extractTokenFromHeader(request: Request): string | undefined {
    const [type, token] = request.headers.authorization?.split(' ') ?? [];
    return type === 'Bearer' ? token : undefined;
  }
}
