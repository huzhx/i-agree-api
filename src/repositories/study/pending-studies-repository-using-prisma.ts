import { PendingStudiesRepositoryInterface } from '../../interfaces/study/pending-studies-repository-interface';
import { StudyInterface } from '../../interfaces/study/study-interface';

export class PendingStudiesRepositoryUsingPrisma implements PendingStudiesRepositoryInterface {
  private prisma: any;
  constructor(prisma: any) {
    this.prisma = prisma;
  }

  async getBy(userId: string): Promise<StudyInterface[]> {
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
    const answer: StudyInterface[] = await this.prisma.request.findMany({
      where: {
        userId,
        consentState: -1,
      },
      select: {
        study: true,
      },
    });
    return answer;
  }
}
