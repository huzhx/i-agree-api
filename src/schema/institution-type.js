import { gql } from 'apollo-server-express';

const schema = gql`
  enum InstitutionType {
    DOCTORSOFFICE
    HOSPITAL
    INSURANCE
    STATEHA
    GOVHA
    BIOTECHCOMPANY
    UNIVERSITY
  }
`;

export default schema;
