import { User } from '@modules/user/entities/user.entity';

export interface ISignUpData
  extends Pick<User, 'userName' | 'email' | 'password'> {}
export interface ILogInData extends Pick<User, 'email' | 'password'> {}

export interface ISignUpResult {
  user: User;
  accessToken: string;
}

export interface ILogInResult {
  user: User;
  accessToken: string;
}

export interface IAuthorizeData {
  accessToken: string;
}

export interface IAuthorizeResult {
  user: User;
}

export interface IAccessTokenPayload {
  id: string;
}
