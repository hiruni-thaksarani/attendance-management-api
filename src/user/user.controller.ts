import { Controller, Post, Body, Get } from '@nestjs/common';
import { UserService } from './user.service';
import { User } from 'libs/schemas/user.schema';
import { CreateEmployeeDto } from './dto/creatrEmployee.dto';
import { CreateAdminDto } from './dto/createAdmin.dto';

@Controller('user')
export class UserController {
  constructor(private readonly usersService: UserService) {}

  @Post('admin')
  async createAdmin(@Body() createAdminDto: CreateAdminDto) {
    return this.usersService.createAdmin(createAdminDto);
  }

  @Post('employee')
  async createEmployee(@Body() createEmployeeDto: CreateEmployeeDto) {
    return this.usersService.createEmployee(createEmployeeDto);
  }

  @Get('employees')
  async findAllEmployees(): Promise<User[]> {
    return this.usersService.findAllEmployees();
  }
}
