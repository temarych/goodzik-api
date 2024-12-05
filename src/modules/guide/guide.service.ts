import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Guide } from './guide.entity';
import { CreateGuideDto } from './dto/create-guide.dto';
import { UpdateGuideDto } from './dto/update-guide.dto';

@Injectable()
export class GuideService {
  constructor(
    @InjectRepository(Guide)
    private readonly guideRepository: Repository<Guide>,
  ) {}

  public async create(data: CreateGuideDto): Promise<Guide> {
    return await this.guideRepository.save({
      ...data,
      categories: data.categories.map((category) => ({ id: category })),
    });
  }

  public async findAll(): Promise<Guide[]> {
    return await this.guideRepository.find();
  }

  public async findOne(id: string): Promise<Guide | null> {
    return await this.guideRepository.findOne({ where: { id } });
  }

  public async update(id: string, data: UpdateGuideDto): Promise<void> {
    await this.guideRepository.update(id, {
      ...data,
      categories: data.categories?.map((category) => ({ id: category })),
    });
  }

  public async delete(id: string): Promise<void> {
    await this.guideRepository.delete(id);
  }
}
