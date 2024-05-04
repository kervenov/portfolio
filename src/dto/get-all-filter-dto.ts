import { ApiProperty } from '@nestjs/swagger';
import { PosterCategory } from 'src/poster/enums/poster-category';
import { PosterLocation } from 'src/poster/enums/poster-location';

export class GetAllFilterDto {
  @ApiProperty({
    default: 10,
    required: false,
    type: Number,
  })
  limit: number;

  @ApiProperty({
    default: 0,
    required: false,
    type: Number,
  })
  offset: number;

  @ApiProperty({
    required: false,
    name: 'location',
    type: Array,
  })
  location: string[];

  @ApiProperty({
    required: false,
    name: 'category',
    type: Array,
  })
  category: string[];

  @ApiProperty({
    required: false,
    name: 'keyword',
  })
  keyword: string;
  
  @ApiProperty({ required: false })
  minPrice: number;

  @ApiProperty({ required: false })
  maxPrice: number;
}
