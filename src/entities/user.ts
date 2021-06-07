import { UserInterface } from '../interfaces/user-interface';
import { AuthTokenInterface } from '../interfaces/auth-token-interface';

export class User implements UserInterface {
  private _id: string | undefined = undefined;
  private _email: string | undefined = undefined;

  private constructor() {}

  public static create({ userID, userEmail }: AuthTokenInterface): User {
    const user = new User();
    user._id = userID;
    user._email = userEmail;
    return user;
  }

  get id() {
    return this._id;
  }

  get email() {
    return this._email;
  }
}
