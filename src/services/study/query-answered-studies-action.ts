import { AnsweredStudiesRepositoryInterface } from '../../interfaces/study/answered-studies-repository-interface';
import { StudyInterface } from '../../interfaces/study/study-interface';

export class QueryAnsweredStudiesAction {
  private queryAnsweredStudiesRepository: AnsweredStudiesRepositoryInterface;

  constructor(queryAnsweredStudiesRepository: AnsweredStudiesRepositoryInterface) {
    this.queryAnsweredStudiesRepository = queryAnsweredStudiesRepository;
  }

  public execute(userId: string): Promise<StudyInterface[]> {
    return this.queryAnsweredStudiesRepository.getBy(userId);
  }
}
