const resolvers = {
  Query: {
    baselinePreferencesCompleted: (parent, { userId }, { models }) => {
      return userId in models.baselinePreference;
    },
    getBaselinePreference: (parent, { userId, institutionType }, { models }) => {
      if (userId in models.baselinePreference) {
        return models.baselinePreference[userId][institutionType];
      } else {
        return null;
      }
    },
  },
};

export default resolvers;
