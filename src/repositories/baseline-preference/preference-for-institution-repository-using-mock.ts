import { PreferenceForInstitutionRepositoryInterface } from '../../interfaces/baseline-preference/preference-for-institution-repository-interface';
import { InstitutionTypeInterface } from '../../interfaces/institution/institution-type-interface';

export class PreferenceForInstitutionRepositoryUsingMock implements PreferenceForInstitutionRepositoryInterface {
  private models: any;
  constructor(models: any) {
    this.models = models;
  }
  getBy(userId: string, institutionType: InstitutionTypeInterface): number {
    const baselinePreference = this.models.baselinePreference[userId];
    const consentState = baselinePreference[institutionType.toString()];
    return consentState;
  }
}
