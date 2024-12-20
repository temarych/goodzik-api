import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GuideCategory } from './guide-category.entity';

@Injectable()
export class GuideCategoryService {
  constructor(
    @InjectRepository(GuideCategory)
    private readonly guideCategoryRepository: Repository<GuideCategory>,
  ) {}

  public async create(
    data: DeepPartial<GuideCategory>,
  ): Promise<GuideCategory> {
    return await this.guideCategoryRepository.save(data);
  }

  public async findAll(): Promise<GuideCategory[]> {
    return await this.guideCategoryRepository.find();
  }

  public async findOne(id: string): Promise<GuideCategory | null> {
    return await this.guideCategoryRepository.findOne({ where: { id } });
  }

  public async update(
    id: string,
    data: DeepPartial<GuideCategory>,
  ): Promise<void> {
    await this.guideCategoryRepository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.guideCategoryRepository.delete(id);
  }
}
