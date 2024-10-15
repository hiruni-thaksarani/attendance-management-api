import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserRole, UserType } from 'libs/schemas/user.schema';
import { Model } from 'mongoose';

@Injectable()
export class UserService {
  constructor(@InjectModel(User.name) private userModel: Model<User>) {}

  async createAdmin(createAdminDto: any): Promise<User> {
    return this.userModel.create({
      ...createAdminDto,
      role: UserRole.ADMIN,
      user_type: UserType.ADMIN,
    });
  }

  async createEmployee(createEmployeeDto: any): Promise<User> {
    return this.userModel.create({
      ...createEmployeeDto,
      role: UserRole.EMPLOYEE,
      user_type: UserType.EMPLOYEE,
    });
  }

  async findAllEmployees(): Promise<User[]> {
    return this.userModel.find({ user_type: UserType.EMPLOYEE }).exec();
  }
}