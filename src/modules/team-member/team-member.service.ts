import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TeamMember } from './team-member.entity';
import {
  CreateTeamMemberData,
  UpdateTeamMemberData,
} from './team-member.service.types';

@Injectable()
export class TeamMemberService {
  constructor(
    @InjectRepository(TeamMember)
    private readonly teamMemberRepository: Repository<TeamMember>,
  ) {}

  public async create(data: CreateTeamMemberData): Promise<TeamMember> {
    return await this.teamMemberRepository.save(data);
  }

  public async findAll(): Promise<TeamMember[]> {
    return await this.teamMemberRepository.find();
  }

  public async findOne(id: string): Promise<TeamMember | null> {
    return await this.teamMemberRepository.findOne({ where: { id } });
  }

  public async update(id: string, data: UpdateTeamMemberData): Promise<void> {
    await this.teamMemberRepository.update(id, data);
  }

  public async delete(id: string): Promise<void> {
    await this.teamMemberRepository.delete(id);
  }
}
