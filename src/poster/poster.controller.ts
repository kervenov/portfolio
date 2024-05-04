/* eslint-disable prettier/prettier */
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  Query,
  Req,
  UseGuards,
  Version,
} from '@nestjs/common';
import { PosterService } from './poster.service';
import { ApiSecurity, ApiTags } from '@nestjs/swagger';
import { CreatePosterDto } from './dto/create-poster.dto';
import { UpdatePosterDto } from 'src/dto/update-poster-dto';
import { AuthGuard } from 'src/auth/auth.guard';
import { Request } from 'express';
import { AddCommentDto } from './dto/add-comment.dto';
@ApiSecurity('token')
@ApiTags('Posters & Only for users')
@Controller()
export class PosterController {
  constructor(private posterService: PosterService) {}
  @UseGuards(AuthGuard)
  @Post('create-poster')
  @Version('1')
  create(@Body() body: CreatePosterDto, @Req() request: Request) {
    return this.posterService.create(body, request);
  }
  @UseGuards(AuthGuard)
  @Get('get-all')
  @Version('1')
  getAll(@Req() request: Request) {
    return this.posterService.getAll(request);
  }

  @Get('get-all-comments/:postId')
  @Version('1')
  getAllComments(@Param('postId', new ParseUUIDPipe()) postId: string) {
    return this.posterService.getAllComments(postId);
  }
  @UseGuards(AuthGuard)
  @Post('add-comment')
  @Version('1')
  addComment(@Body() body: AddCommentDto, @Req() request: Request) {
    return this.posterService.addComment(body, request);
  }
  @UseGuards(AuthGuard)
  @Delete('delete-all')
  @Version('1')
  deleteAll(@Req() req: Request) {
    return this.posterService.deleteAll(req);
  }
  @UseGuards(AuthGuard)
  @Delete('delete-one/:id')
  @Version('1')
  deleteOne(@Param('id', new ParseUUIDPipe()) id: string, @Req() req: Request) {
    return this.posterService.deleteOne(id, req);
  }

  @UseGuards(AuthGuard)
  @Put('modify-poster/:id')
  @Version('1')
  modifyPoster(
    @Query() body: UpdatePosterDto,
    @Param('id', new ParseUUIDPipe()) id: string,
    @Req() req: Request,
  ) {
    return this.posterService.modifyPoster(body, id, req);
  }
  @UseGuards(AuthGuard)
  @Get('view-poster/:uuid')
  @Version('1')
  viewPosteer(@Param('uuid', new ParseUUIDPipe()) id: string) {
    return this.posterService.viewPoster(id);
  }
}
