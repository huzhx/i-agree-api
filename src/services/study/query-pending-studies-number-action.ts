import { QueryPendingStudiesNumberRepositoryInterface } from '../../interfaces/study/query-pending-studies-number-repository-interface';

export class QueryPendingStudiesNumberAction {
  private queryPendingStudiesNumberRepository: QueryPendingStudiesNumberRepositoryInterface;

  constructor(queryPendingStudiesNumberRepository: QueryPendingStudiesNumberRepositoryInterface) {
    this.queryPendingStudiesNumberRepository = queryPendingStudiesNumberRepository;
  }

  public execute(userId: string): number {
    return this.queryPendingStudiesNumberRepository.getBy(userId);
  }
}
