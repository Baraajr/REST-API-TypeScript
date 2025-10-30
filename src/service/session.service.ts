import { get } from 'lodash';
import SessionModel, { SessionDocument } from '../models/session.model';
import { findUser } from './user.service';
import { FilterQuery, UpdateQuery } from 'mongoose';
import { signJwt, verifyJwt } from '../utils/jwt.utils';
import config from 'config';
export async function createSession(userId: string, userAgent: string) {
  const session = await SessionModel.create({
    user: userId,
    userAgent,
  });
  return session;
}

export const getUserSessions = async (query: FilterQuery<SessionDocument>) => {
  return SessionModel.find(query).lean(); // lean will return the plain object
};

export const updateUserSession = async (
  query: FilterQuery<SessionDocument>,
  Update: UpdateQuery<SessionDocument>
) => {
  return SessionModel.updateOne(query, Update);
};

// this function create a new access token using  the use refresh token
export async function reIssueAccessToken({
  refreshToken,
}: {
  refreshToken: string;
}): Promise<string | false> {
  // make sure the refresh token isvalid
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || !get(decoded, 'session')) return false;

  // get session
  const session = await SessionModel.findById(get(decoded, 'session'));

  if (!session || !session.valid) return false;

  // get user from db
  const user = await findUser({ _id: session.user });

  if (!user) return false;

  // create new access token
  const accessToken = signJwt(
    { ...user, session: session._id },
    { expiresIn: config.get('accessTokenTtl') } // 15 minutes
  );

  return accessToken;
}
