import { ApiProperty } from '@nestjs/swagger';

export class UploadFileDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
    description: 'Image file',
    name: 'file',
  })
  file: any; // Use 'any' or the appropriate type for the file
}
