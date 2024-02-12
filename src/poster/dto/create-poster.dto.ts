import { ApiProperty } from '@nestjs/swagger';
import { PosterCategory } from '../enums/poster-category';
import { PosterLocation } from '../enums/poster-location';

export class CreatePosterDto {
  @ApiProperty()
  postName: string;

  @ApiProperty({
    name: 'location',
    type: String,
    enum: PosterLocation,
    description: 'The location of the poster',
  })
  location: PosterLocation;

  @ApiProperty({ type: Number})
  price: number;

  @ApiProperty({
    name: 'category',
    type: String,
    enum: PosterCategory,
    description: 'The category of the poster',
  })
  category: PosterCategory;

  @ApiProperty()
  mobile: string;

  @ApiProperty()
  description: string;
}
