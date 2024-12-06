import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGuideCommentDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public text: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  public guideId: string;
}
