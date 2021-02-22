import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import schema from './schema';
import resolvers from './resolvers';
import models from './models';

console.log('Hello running iAgree Project.');

console.log(process.env.MY_SECRET);

const app = express();

app.use(cors());

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: {
    models,
  },
});

server.applyMiddleware({ app, path: '/graphql' });

app.listen({ port: 8080 }, () => {
  console.log('Apollo Server on http://localhost:8080/graphql');
});
