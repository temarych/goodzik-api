import { DeepPartial } from 'typeorm';
import { TeamMember } from './team-member.entity';

export type CreateTeamMemberData = DeepPartial<TeamMember>;
export type UpdateTeamMemberData = CreateTeamMemberData;
