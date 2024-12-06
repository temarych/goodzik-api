import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Partner } from './partner.entity';
import { CreatePartnerData, UpdatePartnerData } from './partner.service.types';

@Injectable()
export class PartnerService {
  constructor(
    @InjectRepository(Partner)
    private readonly PartnerRepository: Repository<Partner>,
  ) {}

  public async create(data: CreatePartnerData): Promise<Partner> {
    return await this.PartnerRepository.save(data);
  }

  public async findAll(): Promise<Partner[]> {
    return await this.PartnerRepository.find();
  }

  public async findOne(id: string): Promise<Partner | null> {
    return await this.PartnerRepository.findOne({ where: { id } });
  }

  public async update(id: string, data: UpdatePartnerData): Promise<void> {
    await this.PartnerRepository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.PartnerRepository.delete(id);
  }
}
