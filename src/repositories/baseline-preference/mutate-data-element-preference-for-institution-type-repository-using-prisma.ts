import { WriteRepositoryInterface } from '../../interfaces/repository/write-repository-interface';
import { DataElementPreferenceForInstitutionTypeInterface } from '../../interfaces/baseline-preference/data-element-preference-for-institution-type-interface';

export class MutatePreferenceForInstitutionTypeRespositoryUsingPrisma implements WriteRepositoryInterface {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  save(dataElementPreference: DataElementPreferenceForInstitutionTypeInterface) {
    return this.saveQuery(dataElementPreference)
      .catch((e) => {
        console.log(e);
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
  }

  getById(id: string) {
    return this.getQuery(id)
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
  }

  private async saveQuery(dataElementPreference: DataElementPreferenceForInstitutionTypeInterface) {
    await this.prisma.dataElementPreference.update({
      where: {
        id: dataElementPreference.id,
      },
      data: {
        consentState: dataElementPreference.consentState,
      },
    });
  }

  private async getQuery(dataElementPreferenceId: string) {
    return await this.prisma.dataElementPreference.findUnique({
      where: {
        id: dataElementPreferenceId,
      },
    });
  }
}
