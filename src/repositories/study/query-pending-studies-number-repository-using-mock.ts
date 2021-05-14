import { QueryPendingStudiesNumberRepositoryInterface } from '../../interfaces/study/query-pending-studies-number-repository-interface';

export class QueryPendingStudiesNumberRepository implements QueryPendingStudiesNumberRepositoryInterface {
  private models: { consent: {} };
  constructor(models: { consent: {} }) {
    this.models = models;
  }
  getBy(userId: string): number {
    let pendingStudiesNumber = 0;
    const studyConsentStates: { userId: string; consentState: number }[] = Object.values(this.models.consent);
    let studyConsentState: { userId: string; consentState: number };
    for (studyConsentState of studyConsentStates) {
      if (studyConsentState['userId'] === userId! && studyConsentState['consentState'] === null) {
        pendingStudiesNumber++;
      }
    }
    return pendingStudiesNumber;
  }
}
