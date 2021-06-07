import { AuthTokenExpiredRepositoryInterface } from '../../interfaces/user/auth-token-expired-repository-interface';

export class AuthTokenExpiredRepositoryUsingPrisma implements AuthTokenExpiredRepositoryInterface {
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
        isExpired: true,
      },
    });
    return res.length > 0;
  }
}
