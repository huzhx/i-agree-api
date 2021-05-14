import { ContextInterface } from '../interfaces/context-interface';
import { CheckCompletenessAction } from '../services/baseline-preference/check-completeness-action';
import { CheckCompletenessRepositoryUsingMock } from '../repositories/baseline-preference/check-completeness-repository-using-mock';
import { QueryWithInstitutionTypeRepositoryUsingMock } from '../repositories/baseline-preference/query-with-institution-type-repository-using-mock';
import { QueryWithInstitutionTypeAction } from '../services/baseline-preference/query-with-institution-type-action';
import { InstitutionTypeInterface } from '../interfaces/institution/institution-type-interface';
import { QueryPendingStudiesNumberRepository } from '../repositories/study/query-pending-studies-number-repository-using-mock';
import { QueryPendingStudiesNumberAction } from '../services/study/query-pending-studies-number-action';
import { PendingStudiesRepositoryUsingMock } from '../repositories/study/pending-studies-repository-using-mock';
import { QueryPendingStudiesAction } from '../services/study/query-pending-studies-action';

const resolvers = {
  Query: {
    baselinePreferenceCompleted: (parent: any, args: any, { models, user }: ContextInterface) => {
      const checkCompletenessAction = new CheckCompletenessAction(new CheckCompletenessRepositoryUsingMock(models));
      return checkCompletenessAction.execute(user.id!);
    },
    baselinePreferenceBy: (
      parent: any,
      { institutionType }: { institutionType: InstitutionTypeInterface },
      { models, user }: ContextInterface
    ) => {
      const queryWithInstitutionTypeAction = new QueryWithInstitutionTypeAction(
        new QueryWithInstitutionTypeRepositoryUsingMock(models)
      );
      return queryWithInstitutionTypeAction.execute(user.id!, institutionType);
    },
    pendingStudiesNumber: (parent: any, args: any, { models, user }: ContextInterface) => {
      const queryPendingStudiesNumberAction = new QueryPendingStudiesNumberAction(
        new QueryPendingStudiesNumberRepository(models)
      );
      return queryPendingStudiesNumberAction.execute(user.id!);
    },
    pendingStudies: (parent: any, args: any, { models, user }: ContextInterface) => {
      const queryPendingStudiesAction = new QueryPendingStudiesAction(new PendingStudiesRepositoryUsingMock(models));
      return queryPendingStudiesAction.execute(user.id!);
    },
    answeredStudies: (parent: any, args: any, { models, user }: ContextInterface) => {
      const answeredReqs = Object.values(models.consent).filter(
        (req: any) => req.userId === user.id! && req.consentState !== null
      );
      return answeredReqs.map((answeredReq: any) => {
        const studyId = answeredReq.studyId;
        const study = models.study[studyId];
        const studyPreference = {
          ...study,
          consentState: answeredReq.consentState,
          declineReason: answeredReq.declineReason,
          declineReasonOther: answeredReq.declineReasonOther,
        };
        return studyPreference;
      });
    },
  },

  Mutation: {
    updateBaselinePreference: (
      parent: any,
      { userId, institutionType, consentState }: { userId: string; institutionType: string; consentState: string },
      { models }: { models: any }
    ) => {
      models.baselinePreference[userId] = models.baselinePreference[userId] || {};
      if (typeof models.baselinePreference[userId]['userId'] === 'undefined') {
        models.baselinePreference[userId]['userId'] = userId;
      }
      models.baselinePreference[userId][institutionType] = consentState;
      console.log(models.baselinePreference[userId]);
      return {
        institutionType,
        consentState,
      };
    },
    updateStudyPreference: (
      parent: any,
      {
        userId,
        studyId,
        consentInfo,
      }: {
        userId: string;
        studyId: string;
        consentInfo: { consentState: string; declineReason: string; declineReasonOther: string };
      },
      { models }: { models: any }
    ) => {
      const reqs = Object.values(models.consent).filter((req: any) => req.userId === userId && req.studyId === studyId);
      if (reqs.length === 0) return null;
      const req: any = reqs[0];
      req.consentState = consentInfo.consentState;
      req.declineReason = consentInfo.declineReason;
      req.declineReasonOther = consentInfo.declineReasonOther;
      const study = models.study[studyId];
      const studyPreference = {
        ...study,
        consentState: req.consentState,
        declineReason: req.declineReason,
        declineReasonOther: req.declineReasonOther,
      };
      return studyPreference;
    },
  },
};

export default resolvers;
