import { WriteRepositoryInterface } from '../../interfaces/repository/write-repository-interface';
import { UserInterface } from '../../interfaces/user-interface';

export class EnrollUserAction {
  private writeRepositoryInterface: WriteRepositoryInterface;
  constructor(writeRepositoryInterface: WriteRepositoryInterface) {
    this.writeRepositoryInterface = writeRepositoryInterface;
  }

  public save(user: UserInterface) {
    this.writeRepositoryInterface.save(user);
  }
}
