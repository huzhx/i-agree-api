import { CheckCompletenessRepositoryInterface } from '../../interfaces/baseline-preference/check-completeness-repository-interface';

export class CheckCompletenessAction {
  private checkCompletenessRepository: CheckCompletenessRepositoryInterface;

  constructor(checkCompletenessRepository: CheckCompletenessRepositoryInterface) {
    this.checkCompletenessRepository = checkCompletenessRepository;
  }

  public execute(userId: string): boolean {
    return this.checkCompletenessRepository.ofBaselinePreference(userId);
  }
}
