const resolvers = {
  Query: {
    baselinePreferencesCompleted: (parent, { userId }, { models }) => {
      return userId in models.baselinePreference && Object.keys(models.baselinePreference[userId]).length === 8;
    },
    getBaselinePreference: (parent, { userId, institutionType }, { models }) => {
      if (userId in models.baselinePreference) {
        return models.baselinePreference[userId][institutionType];
      } else {
        return null;
      }
    },
    getPendingStudiesNumber: (parent, { userId }, { models }) => {
      let pendingStudiesNumber = 0;
      for (let value of Object.values(models.consent)) {
        if (value['userId'] === userId && value['consentState'] === null) {
          pendingStudiesNumber++;
        }
      }
      return pendingStudiesNumber;
    },
    getPendingStudies: (parent, { userId }, { models }) => {
      const pendingReqs = Object.values(models.consent).filter(
        (req) => req.userId === userId && req.consentState === null
      );
      return pendingReqs.map((req) => {
        const studyId = req.studyId;
        const study = models.study[studyId];
        return study;
      });
    },
    getAnsweredStudies: (parent, { userId }, { models }) => {
      const answeredReqs = Object.values(models.consent).filter(
        (req) => req.userId === userId && req.consentState !== null
      );
      return answeredReqs.map((req) => {
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
    updateBaselinePreference: (parent, { userId, institutionType, consentState }, { models }) => {
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
    updateStudyPreference: (parent, { userId, studyId, consentInfo }, { models }) => {
      const reqs = Object.values(models.consent).filter((req) => req.userId === userId && req.studyId === studyId);
      if (reqs.length === 0) return null;
      const req = reqs[0];
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
