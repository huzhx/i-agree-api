import { PreferenceForInstitutionRepositoryInterface } from '../../interfaces/baseline-preference/preference-for-institution-repository-interface';
import { InstitutionTypeInterface } from '../../interfaces/institution/institution-type-interface';

export class PreferenceForInstitutionRepositoryUsingPrisma implements PreferenceForInstitutionRepositoryInterface {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  async getBy(userId: string, institutionType: InstitutionTypeInterface): Promise<number> {
    const answer = await this.query(userId, institutionType)
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
    return answer.consentState;
  }

  private async query(userId: string, institutionType: InstitutionTypeInterface) {
    const answer = await this.prisma.dataElementPreference.findFirst({
      where: {
        userId: userId,
        institutionType,
      },
      select: {
        consentState: true,
      },
    });
    return answer;
  }
}
