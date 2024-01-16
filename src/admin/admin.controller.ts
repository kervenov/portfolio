import { Controller, Param, Delete, Version } from '@nestjs/common';
import { AdminService } from './admin.service';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Admin')
@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}
  @Delete('delete-poster/:id')
  @Version('1')
  deletePoster(@Param('id') id: string) {
    return this.adminService.deletePoster(id);
  }
  @Delete('delete-all-posters')
  @Version('1')
  deleteAllPosters() {
    return this.adminService.deleteAllPosters();
  }
  @Delete('delete-user/:uuid')
  @Version('1')
  deleteUser(@Param('uuid') uuid: string) {
    return this.adminService.deleteUser(uuid);
  }
  @Delete('delete-all-users')
  @Version('1')
  deleteAllUsers() {
    return this.adminService.deleteAllUsers();
  }
}
