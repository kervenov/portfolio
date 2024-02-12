import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PosterModule } from './poster/poster.module';
import { DatabaseModule } from './database/database.module';
import { databaseProviders } from './database/database.provider';
import { posterProviders } from './poster/poster.providers';
import { UserModule } from './user/user.module';
import { userProviders } from './user/user.provider';
import { AuthModule } from './auth/auth.module';
import { JwtModule } from '@nestjs/jwt';
import { commentProviders } from './poster/comment.provider';
import { MulterModule } from '@nestjs/platform-express';
import { AuthService } from './auth/auth.service';
@Module({
  imports: [
    MulterModule.registerAsync({
      useFactory: () => ({
        dest: './public',
      }),
    }),
    JwtModule.register({
      global: true,
      secret: 'rootadmin',
    }),
    PosterModule,
    DatabaseModule,
    UserModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    AuthService,
    ...databaseProviders,
    ...posterProviders,
    ...userProviders,
    ...commentProviders,
  ],
})
export class AppModule {}
