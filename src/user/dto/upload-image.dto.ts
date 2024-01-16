import { ApiProperty } from '@nestjs/swagger';

export class UploadImageDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file',
    name: 'image',
  })
  file: any; // Use 'any' or the appropriate type for the file
}
