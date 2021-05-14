import { QueryWithInstitutionTypeRepositoryInterface } from '../../interfaces/baseline-preference/query-with-institution-type-repository-interface';
import { InstitutionTypeInterface } from '../../interfaces/institution/institution-type-interface';

export class QueryWithInstitutionTypeRepositoryUsingMock implements QueryWithInstitutionTypeRepositoryInterface {
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
