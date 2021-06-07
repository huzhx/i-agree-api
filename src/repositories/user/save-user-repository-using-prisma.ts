import { WriteRepositoryInterface } from '../../interfaces/repository/write-repository-interface';
import { UserInterface } from '../../interfaces/user-interface';

export class SaveUserRepositoryUsingPrisma implements WriteRepositoryInterface {
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

  getById(id: string) {
    return this.getQuery(id)
      .catch((e) => {
        throw e;
      })
      .finally(async () => {
        await this.prisma.$disconnect();
      });
  }

  private async saveQuery(user: UserInterface) {
    await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        authTokens: {
          create: {
            token: user.authToken,
          },
        },
      },
    });
  }

  private async getQuery(userId: string) {
    await this.prisma.user.findMany({
      where: {
        id: userId,
      },
      include: {
        authTokens: true,
      },
    });
  }
}
