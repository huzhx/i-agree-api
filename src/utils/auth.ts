import jwt from 'jsonwebtoken';
import { AuthenticationError, ApolloError } from 'apollo-server-errors';
import { AuthTokenInterface } from '../interfaces/auth-token-interface';

const auth = (req: any) => {
  let token = req.headers.authorization || '';

  if (!token) {
    throw new AuthenticationError('Authentication failed');
  }

  token = token.replace('Bearer ', '');

  let decoded;

  if (!process.env.JWT_SECRET) {
    throw new ApolloError('JWT_SECRET is not found');
  }
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    throw new AuthenticationError('Authentication failed');
  }

  return { ...(decoded as AuthTokenInterface) };
};

export default auth;
