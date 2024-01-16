import { Inject, Injectable } from '@nestjs/common';
import { AddPoster } from 'src/poster/entities/add-poster.entity';
import { User } from 'src/user/entities/user.entity';
@Injectable()
export class AdminService {
  constructor(
    @Inject('POSTER_REPOSITORY') private posterRepository: typeof AddPoster,
    @Inject('USER_REPOSITORY') private userRepository: typeof User,
  ) {}

  async deletePoster(id: string) {
    await this.posterRepository.destroy({ where: { postId: id } });
    return { message: 'Poster deleted succesfully.' };
  }
  async deleteAllPosters() {
    await this.posterRepository.destroy({ where: {} });
    return { message: 'All posters deleted succesfully.' };
  }
  async deleteUser(uuid: string) {
    await this.posterRepository.destroy({ where: { belongsTo: uuid } });
    await this.userRepository.destroy({ where: { uuid: uuid } });
    return { message: 'User and his/her posters is deleted succesfully.' };
  }
  async deleteAllUsers() {
    await this.posterRepository.destroy({ where: {} });
    await this.userRepository.destroy({ where: {} });
    return { message: 'All users and their posters are deleted succesfully.' };
  }
}
