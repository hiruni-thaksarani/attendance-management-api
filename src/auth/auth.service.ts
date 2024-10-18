import { Injectable } from '@nestjs/common';
import * as jwt from 'jsonwebtoken';
import Web3 from 'web3';
import { ConfigService } from '@nestjs/config';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  private readonly web3: Web3;
  private readonly poAddress: string;
  private readonly jwtSecret: string;

  constructor(
    private configService: ConfigService,
    private userService: UserService,
  ) {
    this.web3 = new Web3();
    this.poAddress = this.configService.get<string>('PO_ADDRESS');
    this.jwtSecret = this.configService.get<string>('JWT_SECRET');
  }

  // Generate a random nonce and a temporary token
  async generateNonce(): Promise<{ nonce: string; token: string }> {
    const nonce = Math.floor(Math.random() * 1000000).toString();
    const token = jwt.sign({ nonce }, this.jwtSecret, { expiresIn: '5m' });
    return { nonce, token };
  }

  // Verify signature and return JWT if valid
  async verifySignature(
    nonce: string,
    signature: string,
    address: string,
    token: string,
  ): Promise<{ success: boolean; token?: string; message?: string }> {
    try {
      // Verify the temporary token
      const decoded = jwt.verify(token, this.jwtSecret) as { nonce: string };
      if (decoded.nonce !== nonce) {
        return { success: false, message: 'Invalid nonce' };
      }

      // Verify the signature
      const recoveredAddress = this.web3.eth.accounts.recover(
        `Nonce: ${nonce}`,
        signature,
      );

      if (recoveredAddress.toLowerCase() !== address.toLowerCase()) {
        return { success: false, message: 'Signature verification failed' };
      }

      if (address.toLowerCase() !== this.poAddress.toLowerCase()) {
        return { success: false, message: 'Not authorized PO address' };
      }

      // Generate JWT if everything is valid
      const newToken = jwt.sign({ address }, this.jwtSecret, {
        expiresIn: '1h',
      });
      return { success: true, token: newToken };
    } catch (error) {
      return { success: false, message: 'Token verification failed' };
    }
  }

  async verifyAdminOrEmployeeLogin(address: string): Promise<{
    success: boolean;
    token?: string;
    role?: string;
    organizationId?: string;
    orgId?: string;
    userId?: string;
    message?: string;
  }> {
    try {
      console.log('Verifying address:', address);
      const user = await this.userService.findByWalletAddress(address);
      console.log('User found:', user);

      if (!user) {
        return { success: false, message: 'User not found' };
      }

      const userRole = user.role;
      if (userRole !== 'ADMIN' && userRole !== 'EMPLOYEE') {
        return { success: false, message: 'Not authorized' };
      }

      const token = jwt.sign(
        {
          address,
          role: userRole,
          organizationId: user.organizationId,
          userId: user._id,
          orgId: user.orgId,
        },
        this.jwtSecret,
        { expiresIn: '1h' },
      );

      return {
        success: true,
        token,
        role: userRole,
        organizationId: user.organizationId,
        userId: user._id.toString(),
        orgId: user.orgId,
      };
    } catch (error) {
      console.error('Login verification failed:', error);
      return { success: false, message: 'Login verification failed' };
    }
  }
}
