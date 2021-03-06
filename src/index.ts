import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import { ApolloServer } from 'apollo-server-express';
import { AuthenticationError } from 'apollo-server-errors';
import { PrismaClient } from '@prisma/client';

import typeDefs from './schema';
import resolvers from './resolvers';
import models from './models';
import auth from './utils/auth';
import { User } from './entities/user';
import { CheckUserExistenceAction } from './services/user/check-user-existence-action';
import { UserExistenceRepositoryUsingPrisma } from './repositories/user/user-existence-repository-using-prisma';
import { TokenDecodedInterface } from './interfaces/token-decoded-interface';
import { SaveUserRepositoryUsingPrisma } from './repositories/user/save-user-repository-using-prisma';
import { EnrollUserAction } from './services/user/enroll-user-action';
import { AuthTokenExpiredRepositoryUsingPrisma } from './repositories/user/auth-token-expired-repository-using-prisma';
import { CheckAuthTokenExpiredAction } from './services/user/check-auth-token-expired-action';
import { AuthTokenExistenceRepositoryUsingPrisma } from './repositories/user/auth-token-existence-repository-using-prisma';
import { CheckAuthTokenExistenceAction } from './services/user/check-auth-token-existence-action';
import { SaveAuthTokenRepositoryUsingPrisma } from './repositories/user/save-auth-token-repository-using-prisma';
import { SaveAuthTokenAction } from './services/user/save-auth-token-action';

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
  context: async ({ req }) => {
    let decoded: TokenDecodedInterface;
    try {
      decoded = auth(req);
      const user: User = User.create(decoded);
      // check if user exists
      const checkUserExistenceAction = new CheckUserExistenceAction(
        new UserExistenceRepositoryUsingPrisma(new PrismaClient())
      );
      const userExists = await checkUserExistenceAction.execute(user.id!);
      console.log({ userExists });

      const prisma = new PrismaClient();

      // enroll user if the user does not exist
      if (!userExists) {
        const enrollUserAction = new EnrollUserAction(new SaveUserRepositoryUsingPrisma(prisma));
        enrollUserAction.save(user);
      } else {
        // check if token exists
        const checkAuthTokenExistenceAction = new CheckAuthTokenExistenceAction(
          new AuthTokenExistenceRepositoryUsingPrisma(prisma)
        );
        const tokenExists = await checkAuthTokenExistenceAction.execute(user.id!, user.authToken!);
        console.log({ tokenExists });
        // if token doesn't exist, add it to the database
        if (tokenExists === false) {
          const saveAuthTokenAction = new SaveAuthTokenAction(new SaveAuthTokenRepositoryUsingPrisma(prisma));
          saveAuthTokenAction.save(user);
        } else {
          // check if auth token has expired
          const checkAuthTokenExpiredAction = new CheckAuthTokenExpiredAction(
            new AuthTokenExpiredRepositoryUsingPrisma(prisma)
          );
          const tokenExpired = await checkAuthTokenExpiredAction.execute(user.id!, user.authToken!);
          console.log({ tokenExpired });
          if (tokenExpired) {
            throw new AuthenticationError('Authentication failed');
          }
        }
      }

      return { models, user, prisma };
    } catch (err) {
      throw new AuthenticationError('Authentication failed');
    }
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
