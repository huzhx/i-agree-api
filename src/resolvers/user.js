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
  },
};

export default resolvers;
