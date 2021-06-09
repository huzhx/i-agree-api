import { PreferenceForInstitutionRepositoryInterface } from '../../interfaces/baseline-preference/preference-for-institution-repository-interface';
import { InstitutionTypeInterface } from '../../interfaces/institution/institution-type-interface';

export class QueryPreferenceForInstitutionAction {
  private preferenceForInstitutionRepository: PreferenceForInstitutionRepositoryInterface;

  constructor(preferenceForInstitutionRepository: PreferenceForInstitutionRepositoryInterface) {
    this.preferenceForInstitutionRepository = preferenceForInstitutionRepository;
  }

  public execute(userId: string, institutionType: InstitutionTypeInterface): Promise<number> {
    return this.preferenceForInstitutionRepository.getBy(userId, institutionType);
  }
}
