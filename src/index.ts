import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';
import auth from './utils/auth';
import { User } from './entities/user';

console.log('Hello running iAgree Project.');

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user: User = User.creator(auth(req));
    return { models, user };
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8080 }, () => {
  console.log('Apollo Server on http://localhost:8080/graphql');
});
