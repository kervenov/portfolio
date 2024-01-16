import { Column, HasMany, Model, Table } from 'sequelize-typescript';
import { AddPoster } from 'src/poster/entities/add-poster.entity';
import { Roles } from '../enums/roles.enum';

@Table
export class User extends Model {
  @Column({ primaryKey: true })
  uuid: string;

  @Column({ allowNull: true })
  image: string;

  @Column({ defaultValue: Roles.user })
  role: Roles;

  @Column({ unique: true })
  username: string;

  @Column({})
  password: string;

  @HasMany(() => AddPoster)
  poster: AddPoster[];
}
