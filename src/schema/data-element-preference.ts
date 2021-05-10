import { gql } from 'apollo-server-express';

const schema = gql`
  type DataElementPreference {
    institutionType: InstitutionType!
    consentState: Int!
  }
`;

export default schema;
