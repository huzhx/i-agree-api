import { AnsweredStudiesRepositoryInterface } from '../../interfaces/study/answered-studies-repository-interface';
import { StudyInterface } from '../../interfaces/study/study-interface';

export class AnsweredStudiesRepositoryUsingPrisma implements AnsweredStudiesRepositoryInterface {
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
        consentState: {
          gte: 0,
        },
      },
      select: {
        study: true,
      },
    });
    return answer;
  }
}
