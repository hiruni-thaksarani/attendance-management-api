import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Organization } from 'libs/schemas/organization.schema';
import { Model } from 'mongoose';

@Injectable()
export class OrganizationService {
  constructor(
    @InjectModel(Organization.name)
    private organizationModel: Model<Organization>,
  ) {}

  async create(createOrganizationDto: any): Promise<Organization> {
    const createdOrganization = new this.organizationModel(
      createOrganizationDto,
    );
    return createdOrganization.save();
  }

  async findAll(): Promise<Organization[]> {
    return this.organizationModel.find().exec();
  }
}
