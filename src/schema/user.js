import { gql } from 'apollo-server-express';

const schema = gql`
  type User {
    id: ID!
    baselinePreference: [DataElementPreference!]
  }

  extend type Query {
    baselinePreferencesCompleted(userId: ID!): Boolean!
    getBaselinePreference(userId: ID!, institutionType: InstitutionType!): Int
    getPendingStudiesNumber(userId: ID!): Int!
    getPendingStudies(userId: ID!): [Study!]
    getAnsweredStudies(userId: ID!): [StudyPreference!]
  }

  extend type Mutation {
    updateBaselinePreference(userId: ID!, institutionType: InstitutionType!, consentState: Int!): DataElementPreference!
    updateStudyPreference(userId: ID!, studyId: ID!, consentInfo: ConsentInfo!): StudyPreference!
  }

  input ConsentInfo {
    consentState: Int!
    declineReason: String
    declineReasonOther: String
  }
`;

export default schema;
