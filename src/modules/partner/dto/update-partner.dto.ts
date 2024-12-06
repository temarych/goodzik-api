import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdatePartnerDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public name?: string;
}
