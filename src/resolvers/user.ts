import { ContextInterface } from '../interfaces/context-interface';
import { QueryPreferenceCompletenessAction } from '../services/baseline-preference/query-preference-completeness-action';
import { QueryPreferenceForInstitutionAction } from '../services/baseline-preference/query-preference-for-institution-action';
import { InstitutionTypeInterface } from '../interfaces/institution/institution-type-interface';
import { QueryPendingStudiesAction } from '../services/study/query-pending-studies-action';
import { PendingStudiesRepositoryUsingPrisma } from '../repositories/study/pending-studies-repository-using-prisma';
import { ExpireAuthTokenRepositoryUsingPrisma } from '../repositories/user/expire-auth-token-repository-using-prisma';
import { ExpireAuthTokenAction } from '../services/user/expire-auth-token-action';
import { PreferenceCompletenessRepositoryUsingPrisma } from '../repositories/baseline-preference/preference-completeness-repository-using-prisma';
import { PreferenceForInstitutionRepositoryUsingPrisma } from '../repositories/baseline-preference/preference-for-institution-repository-using-prisma';
import { MutatePreferenceForInstitutionTypeAction } from '../services/baseline-preference/mutate-preference-for-institution-type-action';
import { MutatePreferenceForInstitutionTypeRespositoryUsingPrisma } from '../repositories/baseline-preference/mutate-data-element-preference-for-institution-type-repository-using-prisma';

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
      const baselinePreference = await queryPreferenceForInstitutionAction.execute(user.id!, institutionType);
      return baselinePreference.consentState;
    },
    pendingStudiesNumber: async (parent: any, args: any, { prisma, user }: ContextInterface) => {
      const queryPendingStudiesAction = new QueryPendingStudiesAction(new PendingStudiesRepositoryUsingPrisma(prisma));
      const pendingStudies = await queryPendingStudiesAction.execute(user.id!);
      return pendingStudies.length;
    },
    pendingStudies: async (parent: any, args: any, { prisma, user }: ContextInterface) => {
      const queryPendingStudiesAction = new QueryPendingStudiesAction(new PendingStudiesRepositoryUsingPrisma(prisma));
      const pendingStudies = await queryPendingStudiesAction.execute(user.id!);
      return pendingStudies;
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
    updateBaselinePreference: async (
      parent: any,
      { institutionType, consentState }: { institutionType: InstitutionTypeInterface; consentState: number },
      { prisma, user }: ContextInterface
    ) => {
      const queryPreferenceForInstitutionAction = new QueryPreferenceForInstitutionAction(
        new PreferenceForInstitutionRepositoryUsingPrisma(prisma)
      );
      const baselinePreference = await queryPreferenceForInstitutionAction.execute(user.id!, institutionType);
      const mutatePreferenceForInstitutionTypeAction = new MutatePreferenceForInstitutionTypeAction(
        new MutatePreferenceForInstitutionTypeRespositoryUsingPrisma(prisma)
      );
      await mutatePreferenceForInstitutionTypeAction.save({
        id: baselinePreference.id,
        institutionType: baselinePreference.institutionType,
        consentState: consentState!,
        userID: baselinePreference.userID,
      });
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
