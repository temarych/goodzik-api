import { ApiProperty } from '@nestjs/swagger';
import { Partner } from '../partner.entity';

export class PartnerDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public name: string;

  public static fromEntity(entity: Partner): PartnerDto {
    const dto = new PartnerDto();

    dto.id = entity.id;
    dto.name = entity.name;

    return dto;
  }
}
