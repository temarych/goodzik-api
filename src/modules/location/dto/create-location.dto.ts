import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLocationDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public title: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public lat: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  public lng: number;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public contactFullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public contactPhoneNumber: string;
}
