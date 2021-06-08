import { AuthTokenExistenceRepositoryInterface } from '../../interfaces/user/auth-token-existence-repository-interface';

export class CheckAuthTokenExistenceAction {
  private authTokenExistenceRepository: AuthTokenExistenceRepositoryInterface;
  constructor(authTokenExistenceRepository: AuthTokenExistenceRepositoryInterface) {
    this.authTokenExistenceRepository = authTokenExistenceRepository;
  }

  public async execute(userId: string, token: string): Promise<boolean> {
    return await this.authTokenExistenceRepository.getBy(userId, token);
  }
}
