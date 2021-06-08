import { WriteRepositoryInterface } from '../../interfaces/repository/write-repository-interface';
import { UserInterface } from '../../interfaces/user-interface';

export class ExpireAuthTokenAction {
  private writeRepositoryInterface: WriteRepositoryInterface;
  constructor(writeRepositoryInterface: WriteRepositoryInterface) {
    this.writeRepositoryInterface = writeRepositoryInterface;
  }

  public async execute(user: UserInterface) {
    await this.writeRepositoryInterface.save(user);
  }

  public getToken(user: UserInterface) {
    return this.writeRepositoryInterface.getBy!(user);
  }
}
