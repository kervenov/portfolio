/* eslint-disable prettier/prettier */
import {
  BelongsTo,
  Column,
  ForeignKey,
  HasMany,
  Model,
  Table,
} from 'sequelize-typescript';
import { User } from 'src/user/entities/user.entity';
import { Comment } from './comment.entity';

@Table
export class AddPoster extends Model {
  @Column({ primaryKey: true })
  postId: string;

  @Column({})
  postName: string;

  @Column({})
  location: string;

  @Column({})
  price: number;

  @Column({})
  category: string;

  @Column({})
  mobile: string;

  @Column({})
  description: string;

  @Column({})
  viewed: number;

  @ForeignKey(() => User)
  @Column
  belongsTo: string;

  @BelongsTo(() => User)
  user: User;

  @HasMany(() => Comment)
  comment: Comment[];
}
