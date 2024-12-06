import { Injectable } from '@nestjs/common';
import { DeepPartial, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { GuideStep } from './guide-step.entity';

@Injectable()
export class GuideStepService {
  constructor(
    @InjectRepository(GuideStep)
    private readonly guideStepRepository: Repository<GuideStep>,
  ) {}

  public async create(data: DeepPartial<GuideStep>): Promise<GuideStep> {
    return await this.guideStepRepository.save(data);
  }

  public async findAll(): Promise<GuideStep[]> {
    return await this.guideStepRepository.find();
  }

  public async findOne(id: string): Promise<GuideStep | null> {
    return await this.guideStepRepository.findOne({ where: { id } });
  }

  public async update(id: string, data: DeepPartial<GuideStep>): Promise<void> {
    await this.guideStepRepository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.guideStepRepository.delete(id);
  }
}
