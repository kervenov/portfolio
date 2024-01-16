import { ApiProperty } from '@nestjs/swagger';

export class GetAllDto {
  @ApiProperty({ default: 0, required: false })
  limit: number;
  @ApiProperty({ default: 0, required: false })
  offset: number;
}
