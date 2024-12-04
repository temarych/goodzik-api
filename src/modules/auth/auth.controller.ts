import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiErrorDto } from '@modules/error/api-error.dto';
import { AuthService } from './auth.service';
import { SignupRequestDto } from './dto/signup.request.dto';
import { LoginRequestDto } from './dto/login.request.dto';
import { SignupResponseDto } from './dto/signup.response.dto';
import { LoginResponseDto } from './dto/login.response.dto';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({
    summary: 'Sign up',
    operationId: 'signup',
    tags: ['user'],
  })
  @ApiOkResponse({ type: SignupResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  @ApiBadRequestResponse({ type: ApiErrorDto })
  public async signUp(@Body() data: SignupRequestDto) {
    const result = await this.authService.signUp(data);
    return SignupResponseDto.fromResult(result!);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Log in',
    operationId: 'login',
    tags: ['user'],
  })
  @ApiOkResponse({ type: LoginResponseDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  @ApiBadRequestResponse({ type: ApiErrorDto })
  public async logIn(@Body() data: LoginRequestDto) {
    const result = await this.authService.logIn(data);
    return LoginResponseDto.fromResult(result!);
  }
}
