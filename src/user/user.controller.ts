import {
  Controller,
  FileTypeValidator,
  MaxFileSizeValidator,
  ParseFilePipe,
  Post,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  Version,
} from '@nestjs/common';
import { UserService } from './user.service';
import { ApiBody, ApiConsumes, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { UploadFileDto } from './dto/upload-file.dto';
import * as multer from 'multer';
import { multerOptions } from 'src/multer.config';
import { diskStorage } from 'multer';
@ApiSecurity('token')
@ApiTags('User')
@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @UseGuards(AuthGuard)
  @Post('upload-profile-image')
  @Version('1')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload an image',
    type: UploadFileDto, // Use the DTO instead of inline schema
  })
  @UseInterceptors(
    FileInterceptor('file', { storage: multer.memoryStorage() }),
  )
  async uploadImage(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'image' })],
      }),
    )
    file: any,
    @Req() req: Request,
  ) {
    return this.userService.setProfileImage(file, req);
  }

  @UseGuards(AuthGuard)
  @Post('upload-video')
  @Version('1')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Upload a video',
    type: UploadFileDto, // Use the DTO instead of inline schema
  })
  @UseInterceptors(
    FileInterceptor('file', multer.memoryStorage()),
  )
  async ploadVideo(
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new FileTypeValidator({ fileType: 'video' }),
          new MaxFileSizeValidator({ maxSize: 20000000 })],
      }),
    )
    file: any,
    @Req() req: Request,
  ) {
    return this.userService.uploadVideo(file, req);
  }
}