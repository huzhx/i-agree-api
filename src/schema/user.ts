import { gql } from 'apollo-server-express';

const schema = gql`
  type User {
    id: ID!
    baselinePreference: [DataElementPreference!]
  }

  extend type Query {
    baselinePreferenceCompleted: Boolean!
    baselinePreferenceBy(institutionType: InstitutionType!): Int
    pendingStudiesNumber: Int!
    pendingStudies: [Study!]
    answeredStudies: [StudyPreference!]
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
