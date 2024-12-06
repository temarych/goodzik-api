import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateTeamMemberDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public fullName: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public imageUrl: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public position: string;
}
