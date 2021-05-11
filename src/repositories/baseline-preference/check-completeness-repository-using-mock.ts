import { CheckCompletenessRepositoryInterface } from '../../interfaces/baseline-preference/check-completeness-repository-interface';

export class CheckCompletenessRepositoryUsingMock implements CheckCompletenessRepositoryInterface {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }

  ofBaselinePreference(userId: string): boolean {
    const baselinePreference = this.models.baselinePreference;
    return userId! in baselinePreference && Object.keys(baselinePreference[userId!]).length === 8;
  }
}
