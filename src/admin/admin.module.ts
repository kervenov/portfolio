import { Module } from '@nestjs/common';
import { AdminService } from './admin.service';
import { AdminController } from './admin.controller';
import { databaseProviders } from 'src/database/database.provider';
import { posterProviders } from 'src/poster/poster.providers';
import { DatabaseModule } from 'src/database/database.module';
import { userProviders } from 'src/user/user.provider';
import { AuthService } from 'src/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
@Module({
  imports: [DatabaseModule,  
    JwtModule.register({
    global: true,
    secret: 'rootadmin',
  }),
],
  controllers: [AdminController],
  providers: [
    AuthService,
    AdminService,
    ...databaseProviders,
    ...posterProviders,
    ...userProviders,
  ],
})
export class AdminModule {}
