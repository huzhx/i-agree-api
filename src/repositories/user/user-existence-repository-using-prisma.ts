import { UserExistenceRepositoryInterface } from '../../interfaces/user/user-existence-repository-interface';

export class UserExistenceRepositoryUsingPrisma implements UserExistenceRepositoryInterface {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  getBy(userId: string): Promise<boolean> {
    return this.query(userId)
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
  }

  private async query(userId: string) {
    return this.prisma.user
      .findMany({
        where: {
          id: userId,
        },
      })
      .then(this.$exists);
  }

  private $exists<T>(ts: T[]): boolean {
    return ts.length > 0;
  }
}
