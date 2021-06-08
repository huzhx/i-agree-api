export interface AuthTokenExistenceRepositoryInterface {
  getBy(userId: string, token: string): Promise<boolean>;
}
