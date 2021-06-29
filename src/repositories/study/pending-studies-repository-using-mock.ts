import { PendingStudiesRepositoryInterface } from '../../interfaces/study/pending-studies-repository-interface';
import { StudyInterface } from '../../interfaces/study/study-interface';

export class PendingStudiesRepositoryUsingMock implements PendingStudiesRepositoryInterface {
  private models: { consent: {}; study: { [key: string]: StudyInterface } };
  constructor(models: { consent: {}; study: { [key: string]: StudyInterface } }) {
    this.models = models;
  }
  getBy(userId: string): Promise<StudyInterface[]> {
    const pendingReqs = Object.values(this.models.consent).filter(
      (req: any) => req.userId === userId! && req.consentState === null
    );
    return Promise.resolve(
      pendingReqs.map((pendingReq: any) => {
        const studyId: string = pendingReq.studyId;
        const study = this.models.study[studyId];
        return study;
      })
    );
  }
}
