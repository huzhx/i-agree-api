import { ContextInterface } from '../interfaces/context-interface';
import { CheckCompletenessAction } from '../services/baseline-preference/check-completeness-action';
import { CheckCompletenessRepositoryUsingMock } from '../repositories/baseline-preference/check-completeness-repository-using-mock';
import { QueryWithInstitutionTypeRepositoryUsingMock } from '../repositories/baseline-preference/query-with-institution-type-repository-using-mock';
import { QueryWithInstitutionTypeAction } from '../services/baseline-preference/query-with-institution-type-action';
import { InstitutionTypeInterface } from '../interfaces/institution/institution-type-interface';

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
      let pendingStudiesNumber = 0;
      let value: any;
      for (value of Object.values(models.consent)) {
        if (value['userId'] === user.id! && value['consentState'] === null) {
          pendingStudiesNumber++;
        }
      }
      return pendingStudiesNumber;
    },
    pendingStudies: (parent: any, args: any, { models, user }: ContextInterface) => {
      const pendingReqs = Object.values(models.consent).filter(
        (req: any) => req.userId === user.id! && req.consentState === null
      );
      return pendingReqs.map((pendingReq: any) => {
        const studyId = pendingReq.studyId;
        const study = models.study[studyId];
        return study;
      });
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
