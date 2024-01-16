import { ApiProperty } from '@nestjs/swagger';
import { PosterCategory } from 'src/poster/enums/poster-category';

export class GetByCategoryDto {
  @ApiProperty({
    required: false,
    name: 'category',
    type: String,
    enum: PosterCategory,
  })
  category: PosterCategory;
}
