export interface UserExistenceRepositoryInterface {
  getBy(userId: string): Promise<boolean>;
}
