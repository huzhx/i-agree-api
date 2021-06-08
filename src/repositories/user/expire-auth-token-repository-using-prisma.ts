import { WriteRepositoryInterface } from '../../interfaces/repository/write-repository-interface';
import { UserInterface } from '../../interfaces/user-interface';

export class ExpireAuthTokenRepositoryUsingPrisma implements WriteRepositoryInterface {
  private prisma: any;

  constructor(prisma: any) {
    this.prisma = prisma;
  }

  save(user: UserInterface) {
    this.saveQuery(user)
      .catch((e) => {
        console.log(e);
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
  }

  private async saveQuery(user: UserInterface) {
    const token = await this.getQuery(user.id!, user.authToken!, false);
    await this.prisma.authToken.update({
      where: {
        id: token.id,
      },
      data: {
        isExpired: true,
      },
    });
  }

  getBy(user: UserInterface) {
    return this.getQuery(user.id!, user.authToken!, true)
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
  }

  private async getQuery(userId: string, token: string, isExpired: boolean) {
    const res = await this.prisma.authToken.findFirst({
      where: {
        userId,
        token,
        isExpired,
      },
    });
    return res;
  }
}
