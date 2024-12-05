import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { ApiErrorCode } from '@modules/error/api-error-code.enum';
import { ApiError } from '@modules/error/api-error.entity';
import { AuthService } from '@modules/auth/auth.service';

@Injectable()
export class AdminRoleGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  public async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const accessToken = this.extractAccessTokenFromHeader(request);

    if (!accessToken) throw new ApiError(ApiErrorCode.Unauthorized);

    const result = await this.authService.authorizeAdmin({ accessToken });

    if (result.user.role !== 'admin')
      throw new ApiError(ApiErrorCode.Forbidden);

    request['admin'] = result!.user;

    return true;
  }

  private extractAccessTokenFromHeader(request: Request): string | null {
    const authorization = request.headers.authorization;

    if (!authorization) return null;

    const [type, token] = authorization.split(' ');

    return type === 'Bearer' ? token : null;
  }
}
