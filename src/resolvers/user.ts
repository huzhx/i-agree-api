import { ApolloError } from 'apollo-server-errors';

const resolvers = {
  Query: {
    baselinePreferencesCompleted: (parent: any, { userId }: { userId: string }, { models }: { models: any }) => {
      return userId in models.baselinePreference && Object.keys(models.baselinePreference[userId]).length === 8;
    },
    getBaselinePreference: (
      parent: any,
      { userId, institutionType }: { userId: string; institutionType: string },
      { models }: { models: any }
    ) => {
      if (userId in models.baselinePreference) {
        return models.baselinePreference[userId][institutionType];
      } else {
        return null;
      }
    },
    getPendingStudiesNumber: (
      parent: any,
      args: any,
      { models, isAuth, userId }: { models: any; isAuth: boolean; userId: string }
    ) => {
      if (!isAuth) {
        throw new ApolloError('Authentication required', '403');
      }
      let pendingStudiesNumber = 0;
      let value: any;
      for (value of Object.values(models.consent)) {
        if (value['userId'] === userId && value['consentState'] === null) {
          pendingStudiesNumber++;
        }
      }
      return pendingStudiesNumber;
    },
    getPendingStudies: (parent: any, { userId }: { userId: string }, { models }: { models: any }) => {
      const pendingReqs = Object.values(models.consent).filter(
        (req: any) => req.userId === userId && req.consentState === null
      );
      return pendingReqs.map((req: any) => {
        const studyId = req.studyId;
        const study = models.study[studyId];
        return study;
      });
    },
    getAnsweredStudies: (parent: any, { userId }: { userId: string }, { models }: { models: any }) => {
      const answeredReqs = Object.values(models.consent).filter(
        (req: any) => req.userId === userId && req.consentState !== null
      );
      return answeredReqs.map((req: any) => {
        const studyId = req.studyId;
        const study = models.study[studyId];
        const studyPreference = {
          ...study,
          consentState: req.consentState,
          declineReason: req.declineReason,
          declineReasonOther: req.declineReasonOther,
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
