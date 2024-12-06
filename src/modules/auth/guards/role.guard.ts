import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Type,
} from '@nestjs/common';
import { ApiErrorCode } from '@modules/error/api-error-code.enum';
import { ApiError } from '@modules/error/api-error.entity';
import { User } from '@modules/user/entities/user.entity';

export function RoleGuard(roles: string[]): Type<CanActivate> {
  @Injectable()
  class RoleGuardMixin implements CanActivate {
    public async canActivate(context: ExecutionContext): Promise<boolean> {
      const request = context.switchToHttp().getRequest();
      const user = request.user as User;

      if (!user) throw new ApiError(ApiErrorCode.Unauthorized);

      if (!roles.includes(user.role))
        throw new ApiError(ApiErrorCode.Forbidden);

      return true;
    }
  }

  return RoleGuardMixin;
}
