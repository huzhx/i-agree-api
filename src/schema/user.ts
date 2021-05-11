import { gql } from 'apollo-server-express';

const schema = gql`
  type User {
    id: ID!
    baselinePreference: [DataElementPreference!]
  }

  extend type Query {
    baselinePreferencesCompleted: Boolean!
    getBaselinePreference(institutionType: InstitutionType!): Int
    getPendingStudiesNumber: Int!
    getPendingStudies: [Study!]
    getAnsweredStudies: [StudyPreference!]
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
