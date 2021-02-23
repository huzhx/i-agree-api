import { gql } from 'apollo-server-express';

const schema = gql`
  type StudyPreference {
    id: ID!
    title: String!
    description: String!
    institutionName: String!
    institutionType: InstitutionType!
    enrollmentDeadline: String!
    requiredDataElements: Int!
    consentState: Int!
    declineReason: String
    declineReasonOther: String
  }
`;

export default schema;
