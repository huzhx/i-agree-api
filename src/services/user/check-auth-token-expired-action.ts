import { AuthTokenExpiredRepositoryInterface } from '../../interfaces/user/auth-token-expired-repository-interface';

export class CheckAuthTokenExpiredAction {
  private authTokenExpiredRepository: AuthTokenExpiredRepositoryInterface;
  constructor(authTokenExpiredRepository: AuthTokenExpiredRepositoryInterface) {
    this.authTokenExpiredRepository = authTokenExpiredRepository;
  }

  public async execute(userId: string, token: string): Promise<boolean> {
    return await this.authTokenExpiredRepository.getBy(userId, token);
  }
}
