import { IsEmail, IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { UserRole, UserType } from 'libs/schemas/user.schema';

export class CreateAdminDto {
  @IsNotEmpty()
  @IsString()
  orgId: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsEnum(UserRole)
  role: UserRole = UserRole.ADMIN;

  @IsEnum(UserType)
  user_type: UserType = UserType.ADMIN;

  @IsNotEmpty()
  @IsString()
  organizationId: string;

  @IsNotEmpty()
  @IsString()
  walletAddress: string;

  @IsNotEmpty()
  @IsString()
  contactNumber: string;
}
