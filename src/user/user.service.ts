import * as fs from 'fs/promises';
import * as sharp from 'sharp';
import { Inject, Injectable } from '@nestjs/common';
import { User } from './entities/user.entity';
import { Request } from 'express';
@Injectable()
export class UserService {
  constructor(@Inject('USER_REPOSITORY') private userRepository: typeof User) {}

  async setProfileImage(file: any, req: Request) {
    const user = await this.userRepository.findOne({
      where: { uuid: req['id'] },
    });
    const webpBuffer = await sharp(file.buffer)
    .resize({ width: 500, height: 500 }) // Optional: resize image
    .composite([{ input: 'public/logo1.webp', top: 10, left: 10, }])
    .toFormat('webp')
    .toBuffer()
    if (user.image) {
      await fs.rm(`public/${req['id']}.webp`);
    }
    await fs.writeFile(`public/${req['id']}.webp`, webpBuffer);
    user.image = `public/${req['id']}.webp`;
    return { status: 201, message: 'success', user };
  }
}

