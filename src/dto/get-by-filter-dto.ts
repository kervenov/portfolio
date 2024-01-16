import { ApiProperty } from '@nestjs/swagger';
import { PosterCategory } from 'src/poster/enums/poster-category';
import { PosterLocation } from 'src/poster/enums/poster-location';

export class GetByFilterDto {
  @ApiProperty({
    required: false,
    name: 'location',
    type: String,
    enum: PosterLocation,
  })
  location: PosterLocation;

  @ApiProperty({
    required: false,
    name: 'category',
    type: String,
    enum: PosterCategory,
  })
  category: PosterCategory;

  @ApiProperty({ required: false })
  minPrice: number;

  @ApiProperty({ required: false })
  maxPrice: number;
}
