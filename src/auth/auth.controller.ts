import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { POAddressGuard } from './po-address.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('generate-nonce')
  async generateNonce() {
    const { nonce, token } = await this.authService.generateNonce();
    return { nonce, token };
  }

  @Post('verify-signature')
  @UseGuards(POAddressGuard)
  async verifySignature(
    @Body('nonce') nonce: string,
    @Body('signature') signature: string,
    @Body('address') address: string,
    @Body('token') token: string,
  ) {
    const result = await this.authService.verifySignature(
      nonce,
      signature,
      address,
      token,
    );
    if (result.success) {
      return { success: true, token: result.token };
    }
    return { success: false, message: result.message };
  }

  @Post('verify-admin-employee-login')
  async verifyAdminEmployeeLogin(@Body() body: { address: string }) {
    console.log('Received login request for address:', body.address);
    const result = await this.authService.verifyAdminOrEmployeeLogin(
      body.address,
    );
    console.log('Login verification result:', result);
    return result;
  }
}
