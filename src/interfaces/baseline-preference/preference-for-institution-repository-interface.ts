import { InstitutionTypeInterface } from '../institution/institution-type-interface';
import { DataElementPreferenceForInstitutionTypeInterface } from './data-element-preference-for-institution-type-interface';

export interface PreferenceForInstitutionRepositoryInterface {
  getBy(
    userId: string,
    institutionType: InstitutionTypeInterface
  ): Promise<DataElementPreferenceForInstitutionTypeInterface>;
}
