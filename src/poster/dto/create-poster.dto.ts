import { ApiProperty } from '@nestjs/swagger';
import { PosterCategory } from '../enums/poster-category';
import { PosterLocation } from '../enums/poster-location';

export class CreatePosterDto {
  @ApiProperty()
  postName: string;

  @ApiProperty()
  location: string;

  @ApiProperty()
  price: number;

  @ApiProperty()
  category: string;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  description: string;
}
