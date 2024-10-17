import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

export type AttendanceDocument = Attendance & Document;

@Schema()
export class Attendance {
  @Prop({ type: Types.ObjectId, ref: 'User', required: true })
  employeeId: Types.ObjectId;

  @Prop({ required: true })
  date: Date;

  @Prop({ required: true })
  markTime: Date;

  @Prop({ required: true, enum: ['on-time', 'late'] })
  status: string;
}

export const AttendanceSchema = SchemaFactory.createForClass(Attendance);
