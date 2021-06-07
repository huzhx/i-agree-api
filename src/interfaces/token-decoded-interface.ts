import { AuthTokenInterface } from './auth-token-interface';

export interface TokenDecodedInterface extends AuthTokenInterface {
  authToken: string;
}
