import { Controller, Get, Param, Post, Query, Version } from '@nestjs/common';
import { AppService } from './app.service';
import { ApiTags } from '@nestjs/swagger';
import { GetByFilterDto } from './dto/get-by-filter-dto';
import { GetByCategoryDto } from './dto/get-by-category.dto';

@ApiTags('For Guests')
@Controller('app')
export class AppController {
  constructor(private readonly appService: AppService) {}
  @Get('get-all')
  @Version('1')
  getAll() {
    return this.appService.getAll();
  }
  @Post('get-by-filter')
  @Version('1')
  getByFilter(@Query() body: GetByFilterDto) {
    return this.appService.getByFilter(body);
  }

  @Get('get-by-category/:category')
  @Version('1')
  getByCategory(@Query('category') category: GetByCategoryDto) {
    return this.appService.getByCategory(category);
  }

  @Get('search/:request')
  @Version('1')
  search(@Param('request') requiredSearch: string) {
    return this.appService.search(requiredSearch);
  }
}
