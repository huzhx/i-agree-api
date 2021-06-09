import { v4 as uuid } from 'uuid';
import { WriteRepositoryInterface } from '../../interfaces/repository/write-repository-interface';
import { UserInterface } from '../../interfaces/user-interface';
import InstitutionType from '../../value-objects/institution-type';

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
    const preferenceValues = [];
    for (let type in InstitutionType) {
      preferenceValues.push({ id: uuid(), institutionType: type });
    }
    await this.prisma.user.create({
      data: {
        id: user.id,
        email: user.email,
        authTokens: {
          create: {
            token: user.authToken,
          },
        },
        baselinePreference: {
          create: preferenceValues,
        },
      },
    });
  }

  private async getQuery(userId: string) {
    return await this.prisma.user.findMany({
      where: {
        id: userId,
      },
      include: {
        authTokens: true,
        baselinePreference: true,
      },
    });
  }
}
