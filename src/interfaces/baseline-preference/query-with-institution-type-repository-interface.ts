import { InstitutionTypeInterface } from '../institution/institution-type-interface';

export interface QueryWithInstitutionTypeRepositoryInterface {
  getBy(userId: string, institutionType: InstitutionTypeInterface): number;
}
