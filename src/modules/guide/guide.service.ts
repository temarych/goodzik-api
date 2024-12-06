import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiErrorCode } from '@modules/error/api-error-code.enum';
import { ApiError } from '@modules/error/api-error.entity';
import { Guide } from './guide.entity';
import { CreateGuideData, UpdateGuideData } from './guide.service.types';

@Injectable()
export class GuideService {
  constructor(
    @InjectRepository(Guide)
    private readonly guideRepository: Repository<Guide>,
  ) {}

  public async create(data: CreateGuideData): Promise<Guide> {
    const categories = data.categories?.map((category) => ({ id: category }));
    return await this.guideRepository.save({ ...data, categories });
  }

  public async findAll(): Promise<Guide[]> {
    return await this.guideRepository.find();
  }

  public async findOne(id: string): Promise<Guide | null> {
    return await this.guideRepository.findOne({ where: { id } });
  }

  public async update(id: string, data: UpdateGuideData): Promise<void> {
    const guide = await this.findOne(id);

    if (!guide) throw new ApiError(ApiErrorCode.EntityNotFound);

    const categories = data.categories?.map((category) => ({ id: category }));

    Object.assign(guide, { ...data, categories });

    await this.guideRepository.save(guide);
  }

  public async delete(id: string): Promise<void> {
    await this.guideRepository.delete(id);
  }
}
