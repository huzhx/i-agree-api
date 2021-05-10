import { gql } from 'apollo-server-express';

const schema = gql`
  type Study {
    id: ID!
    title: String!
    purpose: String!
    institutionName: String!
    institutionType: InstitutionType!
    principleInvestigator: String!
    sponsor: String!
    irbContent: String!
    irbApprovalDate: String!
    irbApprovedBy: String!
    additionalInfoURL: String!
    enrollmentDeadline: String!
    requiredDataElements: Int!
    status: String!
  }
`;

export default schema;
