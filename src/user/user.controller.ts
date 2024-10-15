import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'libs/schemas/user.schema';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('admin')
  async createAdmin(@Body() createAdminDto: any) {
    return this.usersService.createAdmin(createAdminDto);
  }

  @Post('employee')
  async createEmployee(@Body() createEmployeeDto: any) {
    return this.usersService.createEmployee(createEmployeeDto);
  }

  @Get('employees')
  async findAllEmployees(): Promise<User[]> {
    return this.usersService.findAllEmployees();
  }
}
