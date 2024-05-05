import { ApiProperty } from '@nestjs/swagger';
import { PosterCategory } from 'src/poster/enums/poster-category';
import { PosterLocation } from 'src/poster/enums/poster-location';

export class UpdatePosterDto {
  @ApiProperty({
    default: null,
    required: false,
  })
  postName: string;

  @ApiProperty({
    required: false,
    default: null,
  })
  location: string;

  @ApiProperty({
    default: null,
    required: false,
  })
  price: number;

  @ApiProperty({
    default: null,
    required: false,
  })
  category: string;

  @ApiProperty({
    default: null,
    required: false,
  })
  mobile: string;

  @ApiProperty({
    default: null,
    required: false,
  })
  description: string;
}
