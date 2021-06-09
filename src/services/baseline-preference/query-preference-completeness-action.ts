import { PreferenceCompletenessRepositoryInterface } from '../../interfaces/baseline-preference/preference-completeness-repository-interface';

export class QueryPreferenceCompletenessAction {
  private preferenceCompletenessRepository: PreferenceCompletenessRepositoryInterface;

  constructor(preferenceCompletenessRepository: PreferenceCompletenessRepositoryInterface) {
    this.preferenceCompletenessRepository = preferenceCompletenessRepository;
  }

  public execute(userId: string): Promise<boolean> {
    return this.preferenceCompletenessRepository.getBy(userId);
  }
}
