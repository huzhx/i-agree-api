import { Study } from '.prisma/client';
import { StudyInterface } from './study-interface';

export interface AnsweredStudiesRepositoryInterface {
  getBy(userId: string): Promise<StudyInterface[]>;
}
