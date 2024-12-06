import { ApiProperty } from '@nestjs/swagger';
import { Partner } from '../partner.entity';

export class PartnerDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public fullName: string;

  @ApiProperty()
  public imageUrl: string;

  @ApiProperty()
  public position: string;

  public static fromEntity(entity: Partner): PartnerDto {
    const dto = new PartnerDto();

    dto.id = entity.id;
    dto.fullName = entity.fullName;
    dto.imageUrl = entity.imageUrl;
    dto.position = entity.position;

    return dto;
  }
}
