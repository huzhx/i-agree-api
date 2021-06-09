import { gql } from 'apollo-server-express';

const schema = gql`
  type User {
    id: ID!
    authTokens: [AuthToken]
    baselinePreference: [DataElementPreference!]
  }

  type AuthToken {
    id: ID!
    token: String!
    isExpired: Boolean!
    userId: String!
  }

  extend type Query {
    baselinePreferenceCompleted: Boolean!
    baselinePreferenceBy(institutionType: InstitutionType!): Int
    pendingStudiesNumber: Int!
    pendingStudies: [Study!]
    answeredStudies: [StudyPreference!]
  }

  extend type Mutation {
    expireAuthToken: String
    updateBaselinePreference(institutionType: InstitutionType!, consentState: Int!): DataElementPreference!
    updateStudyPreference(userId: ID!, studyId: ID!, consentInfo: ConsentInfo!): StudyPreference!
  }

  input ConsentInfo {
    consentState: Int!
    declineReason: String
    declineReasonOther: String
  }
`;

export default schema;
