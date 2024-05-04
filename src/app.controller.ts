/* eslint-disable prettier/prettier */
import { Controller, Get, Param, Post, Query, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { GetAllFilterDto } from './dto/get-all-filter-dto';

@ApiTags('For Guests')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('get-all')
  @Version('1')
  getAll(@Query() query: GetAllFilterDto) {
    return this.appService.getAll(query);
  }
}
