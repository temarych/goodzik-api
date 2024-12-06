import { ApiProperty } from '@nestjs/swagger';
import { TeamMember } from '../team-member.entity';

export class TeamMemberDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public fullName: string;

  @ApiProperty()
  public imageUrl: string;

  @ApiProperty()
  public position: string;

  public static fromEntity(entity: TeamMember): TeamMemberDto {
    const dto = new TeamMemberDto();

    dto.id = entity.id;
    dto.fullName = entity.fullName;
    dto.imageUrl = entity.imageUrl;
    dto.position = entity.position;

    return dto;
  }
}
