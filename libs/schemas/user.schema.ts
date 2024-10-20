import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export enum UserRole {
  PRODUCT_OWNER = 'PRODUCT_OWNER',
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

export enum UserType {
  ADMIN = 'ADMIN',
  EMPLOYEE = 'EMPLOYEE',
}

@Schema()
export class User extends Document {
  @Prop({ required: true })
  orgId: string;

  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;

  @Prop({ required: true, enum: UserRole })
  role: UserRole;

  @Prop({ required: true, enum: UserType })
  user_type: UserType;

  @Prop()
  organizationId?: string;

  @Prop()
  walletAddress: string;

  @Prop()
  contactNumber: string;

  @Prop({
    required: function () {
      return this.user_type === UserType.EMPLOYEE;
    },
  })
  employeeNumber?: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
