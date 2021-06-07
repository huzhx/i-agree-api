import { UserInterface } from './user-interface';

export interface ContextInterface {
  models?: any;
  user: UserInterface;
  prisma?: any;
}
