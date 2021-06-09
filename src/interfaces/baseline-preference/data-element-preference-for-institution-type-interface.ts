import { InstitutionTypeInterface } from '../institution/institution-type-interface';

export interface DataElementPreferenceForInstitutionTypeInterface {
  id: string | undefined;
  institutionType: InstitutionTypeInterface | undefined;
  consentState: number | undefined;
  userID: string | undefined;
}
