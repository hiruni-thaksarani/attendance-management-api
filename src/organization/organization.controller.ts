import { Controller, Post, Body, Get } from '@nestjs/common';
import { OrganizationService } from './organization.service';
import { Organization } from 'libs/schemas/organization.schema';

@Controller('organizations')
export class OrganizationController {
  constructor(private readonly organizationsService: OrganizationService) {}

  @Post()
  async create(@Body() createOrganizationDto: any) {
    return this.organizationsService.create(createOrganizationDto);
  }

  @Get()
  async findAll(): Promise<Organization[]> {
    return this.organizationsService.findAll();
  }
}
