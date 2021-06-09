import { WriteRepositoryInterface } from '../../interfaces/repository/write-repository-interface';
import { DataElementPreferenceForInstitutionTypeInterface } from '../../interfaces/baseline-preference/data-element-preference-for-institution-type-interface';

export class MutatePreferenceForInstitutionTypeAction {
  private writeRepositoryInterface: WriteRepositoryInterface;
  constructor(writeRepositoryInterface: WriteRepositoryInterface) {
    this.writeRepositoryInterface = writeRepositoryInterface;
  }

  public save(dataElementPreference: DataElementPreferenceForInstitutionTypeInterface) {
    this.writeRepositoryInterface.save(dataElementPreference);
  }
}
