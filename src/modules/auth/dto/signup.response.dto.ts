import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@modules/user/dto/user.dto';
import { ISignUpResult } from '../auth.service.types';

export class SignupResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsIn' })
  public accessToken: string;

  @ApiProperty({ type: () => UserDto })
  public user: UserDto;

  public static fromResult(data: ISignUpResult) {
    const response = new SignupResponseDto();
    response.accessToken = data.accessToken;
    response.user = UserDto.fromEntity(data.user);
    return response;
  }
}
