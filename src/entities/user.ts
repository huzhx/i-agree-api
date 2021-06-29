import { UserInterface } from '../interfaces/user/user-interface';
import { TokenDecodedInterface } from '../interfaces/token-decoded-interface';

export class User implements UserInterface {
  private _id: string | undefined = undefined;
  private _email: string | undefined = undefined;
  private _authToken: string | undefined = undefined;

  private constructor() {}

  public static create({ userID, userEmail, authToken }: TokenDecodedInterface): User {
    const user = new User();
    user._id = userID;
    user._email = userEmail;
    user._authToken = authToken;
    return user;
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }

  get authToken() {
    return this._authToken;
  }
}
