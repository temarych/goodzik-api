import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from '@modules/user/user.service';
import { ApiError } from '@modules/error/api-error.entity';
import { ApiErrorCode } from '@modules/error/api-error-code.enum';
import { HashService } from './hash/hash.service';
import {
  IAccessTokenPayload,
  IAuthorizeData,
  IAuthorizeResult,
  ILogInData,
  ILogInResult,
  ISignUpData,
  ISignUpResult,
} from './auth.service.types';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly hashService: HashService,
  ) {}

  public async signUp(data: ISignUpData): Promise<ISignUpResult> {
    const isEmailUnique = await this.userService.isEmailUnique(data.email);

    if (!isEmailUnique) throw new ApiError(ApiErrorCode.EmailNotUnique);

    const password = await this.hashService.hash(data.password);

    const user = await this.userService.create({
      ...data,
      password,
      role: 'customer',
    });

    const accessToken = this.jwtService.sign({ id: user.id });

    return { user, accessToken };
  }

  public async logIn(data: ILogInData): Promise<ILogInResult> {
    const user = await this.userService.findOneByEmail(data.email);

    if (!user) throw new ApiError(ApiErrorCode.EntityNotFound);

    const isCorrectPassword = await this.hashService.compare(
      data.password,
      user.password,
    );

    if (!isCorrectPassword) throw new ApiError(ApiErrorCode.Unauthorized);

    const accessToken = this.jwtService.sign({ id: user.id });

    return { user, accessToken };
  }

  public async authorize(data: IAuthorizeData): Promise<IAuthorizeResult> {
    try {
      const payload = this.jwtService.verify<IAccessTokenPayload>(
        data.accessToken,
      );

      const user = await this.userService.findOne(payload.id);

      if (!user) throw new ApiError(ApiErrorCode.EntityNotFound);

      return { user };
    } catch (error) {
      if (error instanceof ApiError) throw error;
      throw new ApiError(ApiErrorCode.Unauthorized);
    }
  }
}
