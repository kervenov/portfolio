import * as fs from 'fs/promises';
import * as sharp from 'sharp';
import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Request } from 'express';
import ffmpeg from 'fluent-ffmpeg';
@Injectable()
export class UserService {
  constructor(@Inject('USER_REPOSITORY') private userRepository: typeof User) {}

  async setProfileImage(file: any, req: Request) {
    const user = await this.userRepository.findOne({
      where: { uuid: req['id'] },
    });
    const webpBuffer = await sharp(file.buffer).toFormat('webp').toBuffer();
    if (user.image) {
      await fs.rm(`public/${req['id']}.webp`);
    }
    await fs.writeFile(`public/${req['id']}.webp`, webpBuffer);
    user.image = `public/${req['id']}.webp`;
    return { status: 201, message: 'success', user };
  }

  async uploadVideo(file: any, req: Request) {
    await fs.writeFile('public/video.mp4', file.buffer);
        ffmpeg('public/video.mp4')
          .input('public/video.mp4')
          .videoCodec('libx264')
          .format('dash')
          .output('/public/compressed')
          .on('end', () => {
            console.log('DASH encoding complete.');
          })
          .on('error', (err) => {
            console.error('Error:', err.message)})
          .run();
  }  
}
