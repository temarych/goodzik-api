import { Body, Controller, Get, Post, Req, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ApiErrorDto } from '@modules/error/api-error.dto';
import { AuthService } from '@modules/auth/auth.service';
import { LoginResponseDto } from '@modules/auth/dto/login.response.dto';
import { LoginRequestDto } from '@modules/auth/dto/login.request.dto';
import { UserDto } from '@modules/user/dto/user.dto';
import { User } from '@modules/user/entities/user.entity';
import { AdminRoleGuard } from './guard/adminRole.guard';

@Controller('admin')
export class AdminController {
  constructor(private authService: AuthService) {}

  @Get('me')
  @UseGuards(AdminRoleGuard)
  @ApiOperation({
    summary: 'Get the current admin',
    operationId: 'getMe as admin',
    tags: ['admin'],
  })
  @ApiSecurity('bearer')
  @ApiOkResponse({ type: LoginRequestDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  public async getMe(@Req() request): Promise<UserDto> {
    const admin = request.admin as User;
    return UserDto.fromEntity(admin);
  }

  @Post('login')
  @ApiOperation({
    summary: 'Log in as admin',
    operationId: 'admin login',
    tags: ['admin'],
  })
  @ApiOkResponse({ type: LoginRequestDto })
  @ApiUnauthorizedResponse({ type: ApiErrorDto })
  @ApiBadRequestResponse({ type: ApiErrorDto })
  public async logIn(@Body() data: LoginRequestDto) {
    const result = await this.authService.logInAdmin(data);
    return LoginResponseDto.fromResult(result!);
  }
}
