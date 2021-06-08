import { AuthTokenExistenceRepositoryInterface } from '../../interfaces/user/auth-token-existence-repository-interface';

export class AuthTokenExistenceRepositoryUsingPrisma implements AuthTokenExistenceRepositoryInterface {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  getBy(userId: string, token: string): Promise<boolean> {
    return this.query(userId, token)
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
  }

  private async query(userId: string, token: string) {
    const res = await this.prisma.authToken.findMany({
      where: {
        userId,
        token,
      },
    });
    return res.length > 0;
  }
}
