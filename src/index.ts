import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';

import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';
import auth from './utils/auth';
import { User } from './entities/user';

const PORT = process.env.PORT || 4000;
const app = express();

app.use((_, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  next();
});

app.use(cors());

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => {
    const user: User = User.creator(auth(req));
    return { models, user };
  },
  introspection: true,
  playground: true,
});

server.applyMiddleware({ app, path: '/graphql', cors: false });

app.listen({ port: PORT }, () => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port ${PORT}
    📭  Query at http://localhost:${PORT}/graphql`);
});
