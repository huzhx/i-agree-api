import { WriteRepositoryInterface } from '../../interfaces/repository/write-repository-interface';
import { UserInterface } from '../../interfaces/user/user-interface';

export class SaveAuthTokenAction {
  private writeRepositoryInterface: WriteRepositoryInterface;
  constructor(writeRepositoryInterface: WriteRepositoryInterface) {
    this.writeRepositoryInterface = writeRepositoryInterface;
  }

  public save(user: UserInterface) {
    this.writeRepositoryInterface.save(user);
  }
}
