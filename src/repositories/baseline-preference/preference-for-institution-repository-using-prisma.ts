import { PreferenceForInstitutionRepositoryInterface } from '../../interfaces/baseline-preference/preference-for-institution-repository-interface';
import { InstitutionTypeInterface } from '../../interfaces/institution/institution-type-interface';
import { DataElementPreferenceForInstitutionTypeInterface } from '../../interfaces/baseline-preference/data-element-preference-for-institution-type-interface';
import { DataElementPreferenceForInstitutionType } from '../../entities/data-element-preference-for-institution-type';

export class PreferenceForInstitutionRepositoryUsingPrisma implements PreferenceForInstitutionRepositoryInterface {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  async getBy(
    userId: string,
    institutionType: InstitutionTypeInterface
  ): Promise<DataElementPreferenceForInstitutionTypeInterface> {
    const answer = await this.query(userId, institutionType)
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
    return answer;
  }

  private async query(userId: string, institutionType: InstitutionTypeInterface) {
    const answer: DataElementPreferenceForInstitutionTypeInterface = await this.prisma.dataElementPreference.findFirst({
      where: {
        userId: userId,
        institutionType,
      },
    });
    const dataElementPreference = DataElementPreferenceForInstitutionType.create({
      id: answer.id!,
      institutionType: answer.institutionType!,
      consentState: answer.consentState!,
      userID: answer.userID!,
    });
    return dataElementPreference;
  }
}
