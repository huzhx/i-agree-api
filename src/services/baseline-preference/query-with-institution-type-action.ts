import { QueryWithInstitutionTypeRepositoryInterface } from '../../interfaces/baseline-preference/query-with-institution-type-repository-interface';
import { InstitutionTypeInterface } from '../../interfaces/institution/institution-type-interface';

export class QueryWithInstitutionTypeAction {
  private queryWithInstitutionTypeRepository: QueryWithInstitutionTypeRepositoryInterface;

  constructor(queryWithInstitutionTypeRepository: QueryWithInstitutionTypeRepositoryInterface) {
    this.queryWithInstitutionTypeRepository = queryWithInstitutionTypeRepository;
  }

  public execute(userId: string, institutionType: InstitutionTypeInterface) {
    return this.queryWithInstitutionTypeRepository.getBy(userId, institutionType);
  }
}
