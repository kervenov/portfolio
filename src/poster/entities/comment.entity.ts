import {
  BelongsTo,
  Column,
  ForeignKey,
  Model,
  Table,
} from 'sequelize-typescript';
import { AddPoster } from './add-poster.entity';
import { User } from 'src/user/entities/user.entity';
@Table
export class Comment extends Model {
  @Column({ primaryKey: true })
  commentId: string;

  @ForeignKey(() => User)
  @Column
  commentator: string;

  @Column
  comment: string;

  @ForeignKey(() => AddPoster)
  @Column
  postId: string;

  @BelongsTo(() => AddPoster)
  posters: AddPoster;
}
