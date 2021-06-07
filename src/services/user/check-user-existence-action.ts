import { UserExistenceRepositoryInterface } from '../../interfaces/user/user-existence-repository-interface';

export class CheckUserExistenceAction {
  private userExistenceRepository: UserExistenceRepositoryInterface;
  constructor(userExistenceRepository: UserExistenceRepositoryInterface) {
    this.userExistenceRepository = userExistenceRepository;
  }

  public async execute(userId: string): Promise<boolean> {
    return await this.userExistenceRepository.getBy(userId);
  }
}
