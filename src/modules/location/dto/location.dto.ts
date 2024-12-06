import { ApiProperty } from '@nestjs/swagger';
import { Location } from '../location.entity';

export class LocationDto {
  @ApiProperty()
  public id: string;

  @ApiProperty()
  public title: string;

  @ApiProperty()
  public lat: number;

  @ApiProperty()
  public lng: number;

  @ApiProperty()
  public contactFullName: string;

  @ApiProperty()
  public contactPhoneNumber: string;

  public static fromEntity(entity: Location): LocationDto {
    const dto = new LocationDto();

    dto.id = entity.id;
    dto.title = entity.title;
    dto.lat = entity.lat;
    dto.lng = entity.lng;
    dto.contactFullName = entity.contactFullName;
    dto.contactPhoneNumber = entity.contactPhoneNumber;

    return dto;
  }
}
