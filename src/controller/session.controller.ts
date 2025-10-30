import config from 'config';
import { Request, Response } from 'express';
import { validatePassword } from '../service/user.service';
import {
  createSession,
  getUserSessions,
  updateUserSession,
} from '../service/session.service';
import { signJwt } from '../utils/jwt.utils';

export async function createUserSessionHandler(req: Request, res: Response) {
  // validate user password  this return the user
  const user = await validatePassword(req.body);

  if (!user) return res.status(400).send('invalid email or password');

  const userId = user._id.toString();

  // create session
  const session = await createSession(userId, req.get('user-agent') || '');

  // create access token
  const accessToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get<string>('accessTokenTtl') } // 15min
  );

  // create a refresh token
  const refreshToken = signJwt(
    {
      ...user,
      session: session._id,
    },
    { expiresIn: config.get<string>('refreshTokenTtl') } // 1y
  );

  // return access & refresh tokens
  return res.send({ accessToken, refreshToken });
}

export const getUserSessionsHandler = async (req: Request, res: Response) => {
  const userID = res.locals.user._id.toString();
  const userSessions = await getUserSessions({
    user: userID,
    valid: true,
  });
  res.send({ userSessions });
};

export const deleteSessionHandler = async (req: Request, res: Response) => {
  const sessionID = res.locals.user.session;

  // this will invalidate the session not deleting the session from the database
  await updateUserSession({ _id: sessionID }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
};
