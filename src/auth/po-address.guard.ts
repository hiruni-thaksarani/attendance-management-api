import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class POAddressGuard implements CanActivate {
  constructor(private configService: ConfigService) {}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const poAddress = this.configService.get<string>('PO_ADDRESS');
    return request.body.address.toLowerCase() === poAddress.toLowerCase();
  }
}
