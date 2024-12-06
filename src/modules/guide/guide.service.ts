import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ApiErrorCode } from '@modules/error/api-error-code.enum';
import { ApiError } from '@modules/error/api-error.entity';
import { GuideStep } from '@modules/guide-step/guide-step.entity';
import { Guide } from './guide.entity';
import { CreateGuideData, UpdateGuideData } from './guide.service.types';

@Injectable()
export class GuideService {
  constructor(
    @InjectRepository(Guide)
    private readonly guideRepository: Repository<Guide>,
    @InjectRepository(GuideStep)
    private readonly guideStepRepository: Repository<GuideStep>,
  ) {}

  public async create(data: CreateGuideData): Promise<Guide> {
    const categories = data.categories?.map((category) => ({ id: category }));

    const { id } = await this.guideRepository.save({
      ...data,
      categories,
      author: { id: data.authorId },
    });

    await this.guideStepRepository.save(
      (data.steps ?? []).map((step) => ({
        ...step,
        author: { id: data.authorId },
        guide: { id },
      })),
    );

    return (await this.findOne(id)) as Guide;
  }

  public async findAll(): Promise<Guide[]> {
    return await this.guideRepository.find({
      relations: ['author'],
    });
  }

  public async findOne(id: string): Promise<Guide | null> {
    return await this.guideRepository.findOne({
      where: { id },
      relations: ['steps', 'author', 'comments', 'comments.author'],
    });
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
