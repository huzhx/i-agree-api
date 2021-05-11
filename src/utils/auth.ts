import jwt from 'jsonwebtoken';

const auth = (req: any) => {
  let token = req.headers.authorization || '';

  if (!token) {
    return {
      isAuthed: false,
      userId: undefined,
    };
  }

  token = token.replace('Bearer ', '');

  console.log({ token });

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET!);
  } catch (err) {
    console.log(err);
    return { isAuthed: false, userId: undefined };
  }

  if (!decoded) {
    return {
      isAuthed: false,
      userId: undefined,
    };
  }

  console.log({ decoded });

  return { isAuthed: true, ...(decoded as { userId: string }) };
};

export default auth;
