import { PendingStudiesRepositoryInterface } from '../../interfaces/study/pending-studies-repository-interface';
import { StudyInterface } from '../../interfaces/study/study-interface';

export class QueryPendingStudiesAction {
  private queryPendingStudiesRepository: PendingStudiesRepositoryInterface;

  constructor(queryPendingStudiesRepository: PendingStudiesRepositoryInterface) {
    this.queryPendingStudiesRepository = queryPendingStudiesRepository;
  }

  public execute(userId: string): Promise<StudyInterface[]> {
    return this.queryPendingStudiesRepository.getBy(userId);
  }
}
