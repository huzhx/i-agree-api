import { gql } from 'apollo-server-express';

const schema = gql`
  type Study {
    id: ID!
    title: String!
    description: String!
    institutionName: String!
    institutionType: InstitutionType!
    enrollmentDeadline: String!
    requiredDataElements: Int!
  }
`;

export default schema;
