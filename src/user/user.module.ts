import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { databaseProviders } from 'src/database/database.provider';
import { posterProviders } from 'src/poster/poster.providers';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from './user.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [
    UserService,
    ...databaseProviders,
    ...posterProviders,
    ...userProviders,
  ],
})
export class UserModule {}
