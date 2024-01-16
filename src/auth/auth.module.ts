import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { userProviders } from 'src/user/user.provider';
import { posterProviders } from 'src/poster/poster.providers';
import { databaseProviders } from 'src/database/database.provider';
import { DatabaseModule } from 'src/database/database.module';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [DatabaseModule, UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    ...userProviders,
    ...posterProviders,
    ...databaseProviders,
  ],
})
export class AuthModule {}
