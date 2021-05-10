import jwt from 'jsonwebtoken';

const auth = (req: any) => {
  let token = req.headers.authorization || '';

  if (!token) {
    return {
      isAuth: false,
    };
  }

  token = token.replace('Bearer ', '');

  console.log({ token });

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    console.log(err);
    return { isAuth: false };
  }

  if (!decoded) {
    return {
      isAuth: false,
    };
  }

  console.log({ decoded });

  return { isAuth: true, ...(decoded as {}) };
};

export default auth;
