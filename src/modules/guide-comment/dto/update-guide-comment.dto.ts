import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

export class UpdateGuideCommentDto {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  public text?: string;
}
