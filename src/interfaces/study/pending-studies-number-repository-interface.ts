export interface PendingStudiesNumberRepositoryInterface {
  getBy(userId: string): number;
}
