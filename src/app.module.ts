import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { QouteModule } from './qoute/qoute.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
    }),
    MongooseModule.forRoot(process.env.MONGODB_URI || 'mongodb+srv://superadmin:password@cluster0.rwmt0gc.mongodb.net/quote', {
    }),
    AuthModule,
    UserModule,
    QouteModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}