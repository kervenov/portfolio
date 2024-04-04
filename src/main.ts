/* eslint-disable prettier/prettier */
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { VersioningType } from '@nestjs/common';
import * as express from 'express';
import { ExpressAdapter } from '@nestjs/platform-express';
import { AdminModule } from './admin/admin.module';
async function bootstrap() {
  
  const publicServer = express();
  const publicApp = await NestFactory.create(
    AppModule,
    new ExpressAdapter(publicServer),
  );
  publicApp.use(morgan('dev'));
  publicApp.setGlobalPrefix('api');
  publicApp.enableVersioning({
    type: VersioningType.URI,
  });
  const publicOptions = new DocumentBuilder()
    .setTitle('Portfolio Api')
    .setDescription('The Portfolio API description')
    .setVersion('1.0')
    .addSecurity('token', {
      type: 'http',
      scheme: 'bearer',
    })
    .addTag('Portfolio-Api')
    .build();
  const publicDocument = SwaggerModule.createDocument(publicApp, publicOptions);
  SwaggerModule.setup('api', publicApp, publicDocument);
  await publicApp.init();

  const privateServer = express();
  const privateApp = await NestFactory.create(
    AdminModule,
    new ExpressAdapter(privateServer),
  );
  privateApp.use(morgan('dev'));
  privateApp.setGlobalPrefix('api')
  const privateOptions = new DocumentBuilder()
    .setTitle('Admin')
    .setDescription('The admin API description')
    .setVersion('1.0')
    .addSecurity('token', {
      type: 'http',
      scheme: 'bearer',
    })
    .addTag('Admin')
    .build();
  const privateDocument = SwaggerModule.createDocument(privateApp, privateOptions);
  SwaggerModule.setup('api', privateApp, privateDocument);
  await privateApp.init();
    await publicApp.listen(3000);
    await privateApp.listen(8000);  
}
bootstrap();
