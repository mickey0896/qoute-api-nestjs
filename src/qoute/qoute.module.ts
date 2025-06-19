import { Module } from '@nestjs/common';
import { QouteService } from './qoute.service';
import { QouteController } from './qoute.controller';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Qoute, QouteSchema } from './schemas/qoute.schema';
import { UserModule } from '../user/user.module';

@Module({
  imports: [
    MongooseModule.forFeature([
      {
        name: Qoute.name,
        schema: QouteSchema,
      },
    ]),
    UserModule,
  ],
  controllers: [QouteController],
  providers: [QouteService],
})
export class QouteModule {}
