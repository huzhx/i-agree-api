import { AuthenticationError } from 'apollo-server-errors';
import { UserInterface } from '../interfaces/user-interface';

export class User implements UserInterface {
  private _id: string | undefined = undefined;
  private _isAuthed: boolean = false;

  private constructor() {}

  public static creator({ userId, isAuthed }: { userId: string | undefined; isAuthed: boolean }): User {
    const user = new User();
    user._id = userId;
    user._isAuthed = isAuthed;
    user.valid();
    return user;
  }

  private valid(): void {
    if (this._isAuthed === false || this._id === undefined) {
      throw new AuthenticationError('Authentication required');
    }
  }

  get id() {
    return this._id;
  }

  get isAuthed() {
    return this._isAuthed;
  }
}
