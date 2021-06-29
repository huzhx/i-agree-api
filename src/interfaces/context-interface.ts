import { UserInterface } from './user/user-interface';

export interface ContextInterface {
  models?: any;
  user: UserInterface;
  prisma?: any;
}
