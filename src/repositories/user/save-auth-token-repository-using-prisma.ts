import { WriteRepositoryInterface } from '../../interfaces/repository/write-repository-interface';
import { UserInterface } from '../../interfaces/user/user-interface';

export class SaveAuthTokenRepositoryUsingPrisma implements WriteRepositoryInterface {
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
    await this.prisma.authToken.create({
      data: {
        token: user.authToken,
        userId: user.id,
      },
    });
  }
}
