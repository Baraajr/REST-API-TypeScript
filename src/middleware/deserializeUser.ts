import { get } from 'lodash';
import logger from '../utils/logger';
import { Request, Response, NextFunction } from 'express';
import { verifyJwt } from '../utils/jwt.utils';
import { reIssueAccessToken } from '../service/session.service';

const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const accessToken = get(req, 'headers.authorization', '').replace(
    /^Bearer\s/,
    ''
  );

  const refreshTokenRaw = get(req, 'headers.x-refresh', ''); // this might be single or array of strings
  const refreshToken = Array.isArray(refreshTokenRaw)
    ? refreshTokenRaw[0]
    : refreshTokenRaw;

  if (!accessToken) {
    return next();
  }

  // verifying access token
  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  // token expired
  if (expired && refreshToken) {
    // creating new token
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.setHeader('x-access-token', newAccessToken);
    }

    // getting user from access token
    const result = verifyJwt(newAccessToken as string);

    // saving user in res.locals
    res.locals.user = result.decoded;
    return next();
  }

  return next();
};

export default deserializeUser;
