import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '@modules/user/dto/user.dto';
import { ILogInResult } from '../auth.service.types';

export class LoginResponseDto {
  @ApiProperty({ example: 'eyJhbGciOiJIUzI1NiIsIn' })
  public accessToken: string;

  @ApiProperty({ type: () => UserDto })
  public user: UserDto;

  public static fromResult(data: ILogInResult) {
    const response = new LoginResponseDto();
    response.accessToken = data.accessToken;
    response.user = UserDto.fromEntity(data.user);
    return response;
  }
}
