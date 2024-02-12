import { Controller, Param, Delete, Version, Get, UseGuards, Post, Body, ParseUUIDPipe } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { AuthGuard } from 'src/auth/auth.guard';
import { AdminGuard } from './admin.guard';
import { LoginUserDto } from 'src/user/dto/login-user.dto';
import { AuthService } from 'src/auth/auth.service';

@ApiSecurity('token')
@ApiTags('Admins')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService,
    private readonly authService: AuthService) {}
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Get('get-all-users')
  @Version('1')
  getAllUsers(){
    return this.adminService.getAllUsers();  
  }
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Delete('delete-poster/:id')
  @Version('1')
  deletePoster(@Param('id') id: string) {
    return this.adminService.deletePoster(id);
  }
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Delete('delete-all-posters')
  @Version('1')
  deleteAllPosters() {
    return this.adminService.deleteAllPosters();
  }
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Delete('delete-user/:uuid')
  @Version('1')
  deleteUser(@Param('uuid' , new ParseUUIDPipe()) uuid: string) {
    return this.adminService.deleteUser(uuid);
  }
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Delete('delete-all-users')
  @Version('1')
  deleteAllUsers() {
    return this.adminService.deleteAllUsers();
  }
  
  @UseGuards(AuthGuard)
  @UseGuards(AdminGuard)
  @Get('get-all-users-to-excell')
  @Version('1')
  getAllUsersToExcell(){
    return this.adminService.getAllUsersToExcell();
  }
  @Post('login')
  @Version('1')
  login(@Body() body: LoginUserDto){
    return this.authService.login(body);
  }
  @Post('/:refresh')
  @Version('1')
  refresh(@Param('refresh') token: string){
    return this.authService.verifyRefreshToken(token);
  }
}
