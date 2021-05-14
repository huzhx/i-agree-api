import { PendingStudiesNumberRepositoryInterface } from '../../interfaces/study/pending-studies-number-repository-interface';

export class QueryPendingStudiesNumberAction {
  private pendingStudiesNumberRepository: PendingStudiesNumberRepositoryInterface;

  constructor(pendingStudiesNumberRepository: PendingStudiesNumberRepositoryInterface) {
    this.pendingStudiesNumberRepository = pendingStudiesNumberRepository;
  }

  public execute(userId: string): number {
    return this.pendingStudiesNumberRepository.getBy(userId);
  }
}
