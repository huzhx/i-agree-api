import { PreferenceCompletenessRepositoryInterface } from '../../interfaces/baseline-preference/preference-completeness-repository-interface';

export class PreferenceCompletenessRepositoryUsingPrisma implements PreferenceCompletenessRepositoryInterface {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  async getBy(userId: string): Promise<boolean> {
    const answer = await this.query(userId)
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
    return answer;
  }

  private async query(userId: string) {
    const answer = await this.prisma.user
      .findMany({
        where: {
          id: userId,
          baselinePreferenceCompleted: true,
        },
      })
      .then(this.$exists);
    return answer;
  }

  private $exists<T>(ts: T[]): boolean {
    return ts.length === 1;
  }
}
