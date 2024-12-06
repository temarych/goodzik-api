import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateTeamMemberDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public fullName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public imageUrl?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public position?: string;
}
