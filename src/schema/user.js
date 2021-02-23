import { gql } from 'apollo-server-express';

const schema = gql`
  extend type Query {
    baselinePreferencesCompleted(userId: ID!): Boolean!
    getBaselinePreference(userId: ID!, institutionType: InstitutionType!): Int
    getPendingStudiesNumber(userId: ID!): Int!
  }

  extend type Mutation {
    updateBaselinePreference(userId: ID!, institutionType: InstitutionType!, consentState: Int!): DataElementPreference!
  }

  type User {
    id: ID!
    baselinePreference: [DataElementPreference!]
  }
`;

export default schema;
