import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DeepPartial, Repository } from 'typeorm';
import { Guide } from './guide.entity';

@Injectable()
export class GuideService {
  constructor(
    @InjectRepository(Guide)
    private readonly guideRepository: Repository<Guide>,
  ) {}

  public async create(data: DeepPartial<Guide>): Promise<Guide> {
    return await this.guideRepository.save(data);
  }

  public async findAll(): Promise<Guide[]> {
    return await this.guideRepository.find();
  }

  public async findOne(id: string): Promise<Guide | null> {
    return await this.guideRepository.findOne({ where: { id } });
  }

  public async update(id: string, data: DeepPartial<Guide>): Promise<void> {
    await this.guideRepository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.guideRepository.delete(id);
  }
}
