import { Module, forwardRef } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [forwardRef(() => UserModule)], // Make sure UserModule is properly imported and defined
  providers: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
