export interface AuthTokenExpiredRepositoryInterface {
  getBy(userId: string, token: string): Promise<boolean>;
}
