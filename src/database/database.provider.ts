import { Sequelize } from 'sequelize-typescript';
import { AddPoster } from 'src/poster/entities/add-poster.entity';
import { Comment } from 'src/poster/entities/comment.entity';
import { User } from 'src/user/entities/user.entity';
export const databaseProviders = [
  {
    provide: 'SEQUELIZE',
    useFactory: async () => {
      const sequelize = new Sequelize({
        dialect: 'postgres',
        host: 'localhost',
        port: 5432,
        username: 'kakamyrat',
        password: 'admin',
        database: 'portfolio_db',
        logging: false,
      });
      sequelize.addModels([User, AddPoster, Comment]);
      return sequelize;
    },
  },
];
