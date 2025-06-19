import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

export type QouteDocument = Qoute & Document;

@Schema()
export class Qoute {
  @Prop({ required: true, unique: true })
  qoute: string;

  @Prop()
  vote: number;
}

export const QouteSchema = SchemaFactory.createForClass(Qoute);
