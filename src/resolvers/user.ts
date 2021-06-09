import { ContextInterface } from '../interfaces/context-interface';
import { QueryPreferenceCompletenessAction } from '../services/baseline-preference/query-preference-completeness-action';
import { QueryPreferenceForInstitutionAction } from '../services/baseline-preference/query-preference-for-institution-action';
import { InstitutionTypeInterface } from '../interfaces/institution/institution-type-interface';
import { PendingStudiesNumberRepositoryUsingMock } from '../repositories/study/pending-studies-number-repository-using-mock';
import { QueryPendingStudiesNumberAction } from '../services/study/query-pending-studies-number-action';
import { PendingStudiesRepositoryUsingMock } from '../repositories/study/pending-studies-repository-using-mock';
import { QueryPendingStudiesAction } from '../services/study/query-pending-studies-action';
import { ExpireAuthTokenRepositoryUsingPrisma } from '../repositories/user/expire-auth-token-repository-using-prisma';
import { ExpireAuthTokenAction } from '../services/user/expire-auth-token-action';
import { PreferenceCompletenessRepositoryUsingPrisma } from '../repositories/baseline-preference/preference-completeness-repository-using-prisma';
import { PreferenceForInstitutionRepositoryUsingPrisma } from '../repositories/baseline-preference/preference-for-institution-repository-using-prisma';

const resolvers = {
  Query: {
    baselinePreferenceCompleted: async (parent: any, args: any, { prisma, user }: ContextInterface) => {
      const queryPreferenceCompletenessAction = new QueryPreferenceCompletenessAction(
        new PreferenceCompletenessRepositoryUsingPrisma(prisma)
      );
      return await queryPreferenceCompletenessAction.execute(user.id!);
    },
    baselinePreferenceBy: async (
      parent: any,
      { institutionType }: { institutionType: InstitutionTypeInterface },
      { prisma, user }: ContextInterface
    ) => {
      const queryPreferenceForInstitutionAction = new QueryPreferenceForInstitutionAction(
        new PreferenceForInstitutionRepositoryUsingPrisma(prisma)
      );
      return await queryPreferenceForInstitutionAction.execute(user.id!, institutionType);
    },
    pendingStudiesNumber: (parent: any, args: any, { models, user }: ContextInterface) => {
      const queryPendingStudiesNumberAction = new QueryPendingStudiesNumberAction(
        new PendingStudiesNumberRepositoryUsingMock(models)
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
    expireAuthToken: async (parent: any, args: any, { prisma, user }: ContextInterface) => {
      const expireAuthTokenAction = new ExpireAuthTokenAction(new ExpireAuthTokenRepositoryUsingPrisma(prisma));
      await expireAuthTokenAction.execute(user);
      return user.authToken;
    },
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
