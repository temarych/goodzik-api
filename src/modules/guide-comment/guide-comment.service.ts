import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { GuideComment } from './guide-comment.entity';
import {
  CreateGuideCommentData,
  UpdateGuideCommentData,
} from './guide-comment.service.types';

@Injectable()
export class GuideCommentService {
  constructor(
    @InjectRepository(GuideComment)
    private readonly cuideCommentRepository: Repository<GuideComment>,
  ) {}

  public async create(data: CreateGuideCommentData): Promise<GuideComment> {
    return await this.cuideCommentRepository.save({
      ...data,
      author: { id: data.authorId },
      guide: { id: data.guideId },
    });
  }

  public async findAll(): Promise<GuideComment[]> {
    return await this.cuideCommentRepository.find({
      relations: ['author'],
    });
  }

  public async findOne(id: string): Promise<GuideComment | null> {
    return await this.cuideCommentRepository.findOne({
      where: { id },
      relations: ['author'],
    });
  }

  public async update(id: string, data: UpdateGuideCommentData): Promise<void> {
    await this.cuideCommentRepository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.cuideCommentRepository.delete(id);
  }
}
