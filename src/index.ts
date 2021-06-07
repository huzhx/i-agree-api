import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { ApolloError } from 'apollo-server-errors';

import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';
import auth from './utils/auth';
import { User } from './entities/user';
import { AuthTokenInterface } from './interfaces/auth-token-interface';

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
    let decoded: AuthTokenInterface;
    try {
      decoded = auth(req);
      const user: User = User.create(decoded);
      return { models, user };
    } catch (err) {
      throw new ApolloError(err);
    }
  },
  playground: true,
});

server.applyMiddleware({ app, path: '/graphql', cors: false });

app.listen({ port: PORT }, () => {
  console.log(`
    🚀  Server is running!
    🔉  Listening on port ${PORT}
    📭  Query at http://localhost:${PORT}/graphql`);
});
