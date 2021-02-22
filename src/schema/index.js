import { gql } from 'apollo-server-express';

import userSchema from './user';
import dataElementPreferenceSchema from './data-element-preference';
import dataElementSchema from './data-element';
import institutionTypeSchema from './institution-type';

const linkSchema = gql`
  type Query {
    _: Boolean
  }
  type Mutation {
    _: Boolean
  }
  type Subscription {
    _: Boolean
  }
`;

export default [linkSchema, userSchema, dataElementPreferenceSchema, dataElementSchema, institutionTypeSchema];
