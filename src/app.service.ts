import { Inject, Injectable } from '@nestjs/common';
import { AddPoster } from './poster/entities/add-poster.entity';
import { Op } from 'sequelize';
import { GetAllFilterDto } from './dto/get-all-filter-dto';
@Injectable()
export class AppService {
  constructor(
    @Inject('POSTER_REPOSITORY') private posterRepository: typeof AddPoster,
  ) {}
  async getAll(query: GetAllFilterDto) {
    const {limit, offset, category, minPrice, maxPrice, location, keyword } = query;
    let options = {};
    const locations = Array.isArray(location) ? location : [location];
    const categories = Array.isArray(category) ? category : [category];
    if (category && category.length > 0) {
      options = { ...options, category: { [Op.in]: categories } };
    }
    if (location && location.length > 0) {
      options = { ...options, location: { [Op.in]: locations } };
    }
    if (minPrice || maxPrice) {
      options = { ...options, price: { [Op.between]: [minPrice || 0, maxPrice || Number.MAX_VALUE] } };
    }
    if (keyword) {
      options = {
        ...options,
      [Op.or]: {
          postName: { [Op.iLike]: `%${keyword}%` },
          description: { [Op.iLike]: `%${keyword}%` },
          category: { [Op.iLike]: `%${keyword}%` },
        },}
    }
    const allPosters = await this.posterRepository.findAll({
      limit: limit,
      offset: offset,
      where: options,
    });
    return allPosters;
  }
}
