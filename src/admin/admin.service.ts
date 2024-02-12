import { Inject, Injectable } from '@nestjs/common';
import { AddPoster } from 'src/poster/entities/add-poster.entity';
import { User } from 'src/user/entities/user.entity';
import * as exceljs from 'exceljs';
@Injectable()
export class AdminService {
  constructor(
    @Inject('POSTER_REPOSITORY') private posterRepository: typeof AddPoster,
    @Inject('USER_REPOSITORY') private userRepository: typeof User,
  ) {}
  async getAllUsers(){
    const allUsers = await this.userRepository.findAll();
    return allUsers;
  } 
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
  async getAllUsersToExcell(){
    const allUsers = await this.userRepository.findAll();
    const workBook = new exceljs.Workbook();
    const workSheet = workBook.addWorksheet('Users');
    workSheet.columns = [
      { header: 'id', key: 'uuid', width: 30 },
      { header: 'username', key: 'username', width: 20 },
      { header: 'role', key: 'role', width: 10 },
      { header: 'password', key: 'password', width: 60 },
    ];
    workSheet.addRows(allUsers);
    workBook.xlsx.writeFile('public/All-Users-Info.xlsx')
      .then(()=> console.log('File saved succesfully!'))
      .catch((error) => console.error('Error occured: ', error));
      return { message: 'Success!'};  
  }
}
