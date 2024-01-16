import { Module } from '@nestjs/common';
import { PosterService } from './poster.service';
import { PosterController } from './poster.controller';
import { databaseProviders } from 'src/database/database.provider';
import { DatabaseModule } from 'src/database/database.module';
import { posterProviders } from './poster.providers';
import { userProviders } from 'src/user/user.provider';
import { commentProviders } from './comment.provider';

@Module({
  imports: [DatabaseModule],
  controllers: [PosterController],
  providers: [
    PosterService,
    ...databaseProviders,
    ...posterProviders,
    ...userProviders,
    ...commentProviders,
  ],
})
export class PosterModule {}
