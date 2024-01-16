import { ApiProperty } from '@nestjs/swagger';
import { PosterCategory } from 'src/poster/enums/poster-category';
import { PosterLocation } from 'src/poster/enums/poster-location';

export class UpdatePosterDto {
  @ApiProperty({ required: false })
  postName: string;

  @ApiProperty({
    required: false,
    name: 'location',
    type: String,
    enum: PosterLocation,
    description: 'The location of the poster',
  })
  location: PosterLocation;

  @ApiProperty({ required: false })
  price: number;

  @ApiProperty({
    required: false,
    name: 'category',
    type: String,
    enum: PosterCategory,
    description: 'The category of the poster',
  })
  category: PosterCategory;

  @ApiProperty({ required: false })
  mobile: string;

  @ApiProperty({ required: false })
  description: string;
}
