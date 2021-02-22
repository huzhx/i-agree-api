import { gql } from 'apollo-server-express';

const schema = gql`
  enum DataElement {
    DEMO
    CLINICAL
    BIOSPECIMEN
    GENETIC
    MENTAL
    SEX
    FAMILY
  }
`;

export default schema;
