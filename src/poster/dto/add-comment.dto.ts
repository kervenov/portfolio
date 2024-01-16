import { ApiProperty } from '@nestjs/swagger';

export class AddCommentDto {
  @ApiProperty()
  postId: string;
  @ApiProperty()
  comment: string;
}
