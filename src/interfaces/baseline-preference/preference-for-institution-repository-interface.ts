import { InstitutionTypeInterface } from '../institution/institution-type-interface';

export interface PreferenceForInstitutionRepositoryInterface {
  getBy(userId: string, institutionType: InstitutionTypeInterface): Promise<number>;
}
