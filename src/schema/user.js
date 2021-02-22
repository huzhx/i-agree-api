import { gql } from 'apollo-server-express';

const schema = gql`
  extend type Query {
    baselinePreferencesCompleted(userId: ID!): Boolean!

    getBaselinePreference(userId: ID!, institutionType: InstitutionType): Int
  }

  type User {
    id: ID!
    baselinePreference: [DataElementPreference!]
  }
`;

export default schema;
