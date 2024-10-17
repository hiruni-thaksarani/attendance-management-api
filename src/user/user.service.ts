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

  async findByWalletAddress(address: string): Promise<User | null> {
    console.log('Searching for user with address:', address);

    // Normalize the address
    const normalizedAddress = address.toLowerCase();

    // Try to find the user with a case-insensitive search
    const user = await this.userModel
      .findOne({
        walletAddress: { $regex: new RegExp(`^${normalizedAddress}$`, 'i') },
      })
      .exec();

    console.log('User found:', user);

    if (!user) {
      // If user is not found, let's log all users in the database
      const allUsers = await this.userModel.find({}).exec();
      console.log('All users in database:', allUsers);
    }

    return user;
  }
}
