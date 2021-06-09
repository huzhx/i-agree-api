import { PreferenceCompletenessRepositoryInterface } from '../../interfaces/baseline-preference/preference-completeness-repository-interface';

export class PreferenceCompletenessRepositoryUsingMock implements PreferenceCompletenessRepositoryInterface {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }

  getBy(userId: string): Promise<boolean> {
    const baselinePreference = this.models.baselinePreference;
    return Promise.resolve(userId! in baselinePreference && Object.keys(baselinePreference[userId!]).length === 8);
  }
}
