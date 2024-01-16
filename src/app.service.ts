import { Inject, Injectable } from '@nestjs/common';
import { AddPoster } from './poster/entities/add-poster.entity';
import { GetByFilterDto } from './dto/get-by-filter-dto';
import { Op } from 'sequelize';
import { GetByCategoryDto } from './dto/get-by-category.dto';
@Injectable()
export class AppService {
  constructor(
    @Inject('POSTER_REPOSITORY') private posterRepository: typeof AddPoster,
  ) {}

  async getByCategory(category: GetByCategoryDto) {
    const posters = await this.posterRepository.findAll({
      where: { category: category },
    });
    return posters;
  }
  async getAll() {
    const allPosters = await this.posterRepository.findAll();
    return allPosters;
  }
  async search(requiredSearch: string): Promise<AddPoster[]> {
    const search = await this.posterRepository.findAll({
      where: {
        [Op.or]: {
          postName: { [Op.iLike]: `%${requiredSearch}%` },
          description: { [Op.iLike]: `%${requiredSearch}%` },
          category: { [Op.iLike]: `%${requiredSearch}%` },
        },
      },
    });
    return search;
  }
  async getByFilter(body: GetByFilterDto) {
    let option = {};
    if (body.location) {
      option = { ...option, location: body.location };
    }
    if (body.category) {
      option = { ...option, category: body.category };
    }
    if (body.minPrice || body.maxPrice) {
      option = {
        ...option,
        price: {
          [Op.between]: [body.minPrice || 0, body.maxPrice || Number.MAX_VALUE],
        },
      };
    }

    const result = await this.posterRepository.findAll({ where: option });
    return result;
  }
}
