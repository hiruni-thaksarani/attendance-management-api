import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole, UserType } from 'libs/schemas/user.schema';

export class CreateEmployeeDto {
  @IsNotEmpty()
  @IsString()
  orgId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
//   @IsEmail()
  email: string;

  @IsEnum(UserRole)
  role: UserRole = UserRole.EMPLOYEE;

  @IsEnum(UserType)
  user_type: UserType = UserType.EMPLOYEE;

  @IsNotEmpty()
  @IsString()
  organizationId: string;

  @IsNotEmpty()
  @IsString()
  walletAddress: string;

  @IsNotEmpty()
  @IsString()
  contactNumber: string;

  @IsNotEmpty()
  @IsString()
  employeeNumber: string;
}
