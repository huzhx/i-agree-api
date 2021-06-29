import { StudyInterface } from './study-interface';

export interface PendingStudiesRepositoryInterface {
  getBy(userId: string): Promise<StudyInterface[]>;
}
