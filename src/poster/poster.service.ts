import { Inject, Injectable } from '@nestjs/common';
import { CreatePosterDto } from './dto/create-poster.dto';
import { AddPoster } from './entities/add-poster.entity';
import { v4 as uuidv4 } from 'uuid';
import { UpdatePosterDto } from 'src/dto/update-poster-dto';
import { User } from 'src/user/entities/user.entity';
import { Comment } from './entities/comment.entity';
import { AddCommentDto } from './dto/add-comment.dto';
import { GetAllFilterDto } from 'src/dto/get-all-filter-dto';
import { Request } from 'express';
import { Op } from 'sequelize';

@Injectable()
export class PosterService {
  constructor(
    @Inject('POSTER_REPOSITORY')
    private posterRepository: typeof AddPoster,
    @Inject('USER_REPOSITORY')
    private userRepository: typeof User,
    @Inject('COMMENT_REPOSITORY')
    private commentRepository: typeof Comment,
  ) {}
  async getAllComments(postId: string) {
    const comments = await this.commentRepository.findAll({
      where: { postId: postId },
    });
    return comments;
  }
  async create(body: CreatePosterDto, req) {
    const newPoster = await this.posterRepository.create({
      postId: uuidv4(),
      postName: body.postName,
      location: body.location,
      price: body.price,
      category: body.category,
      mobile: body.mobile,
      comments: {},
      description: body.description,
      viewed: 0,
      belongsTo: req['id'],
    });
    return newPoster;
  }
  async addComment(body: AddCommentDto, req) {
    const targetPost = await this.posterRepository.findOne({
      where: { postId: body.postId },
    });
    const commentator = await this.userRepository.findOne({
      where: { uuid: req['id'] },
    });
    const newComment = await this.commentRepository.create({
      commentId: uuidv4(),
      commentator: commentator.username,
      comment: body.comment,
      postId: targetPost.postId,
    });
    return newComment;
  }
  async deleteOne(id: string, req) {
    await this.posterRepository.destroy({
      where: { belongsTo: req['id'], postId: id },
    });
    return { message: 'Deleted succesfully' };
  }
  async modifyPoster(body: UpdatePosterDto, uuid: string, req) {
    const currentPoster = await this.posterRepository.findOne({
      where: {
        belongsTo: req['id'],
        postId: uuid,
      },
    });
    const { postName, category, description, price, mobile, location } = body;
    let options = {};
    if (postName) {
      options = { ...options, postName: postName };
    }
    if (category) {
      options = { ...options, category: category };
    }
    if (description) {
      options = { ...options, description: description };
    }
    if (price) {
      options = { ...options, price: price };
    }
    if (mobile) {
      options = { ...options, mobile: mobile };
    }
    if (location) {
      options = { ...options, location: location };
    }
    await currentPoster.update(options);
    return currentPoster;
  }
  async deleteAll(req) {
    await this.posterRepository.destroy({ where: { belongsTo: req['id'] } });
    return { message: 'Deleted succesfully.' };
  }
  async getAll(query: GetAllFilterDto, req: Request) {
    let options: any = {};
    const { limit, offset, location, category, minPrice, maxPrice, keyword, } = query;
     const locations = Array.isArray(location) ? location : [location];
    const categories = Array.isArray(category) ? category : [category];
    options = { ...options, belongsTo: req['id'] };
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
  async viewPoster(uuid: string) {
    const poster = await this.posterRepository.findOne({ where: { postId: uuid } });
    poster.viewed += 1;
    await poster.save();
    return poster;
  }
}
