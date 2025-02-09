import jwt from 'jsonwebtoken';
import config from 'config';
import { UserDocument } from '../models/user.model';
import { decode } from 'punycode';

const publicKey = config.get<string>('publicKey');
const privateKey = config.get<string>('privateKey');

export const signJwt = (
  payload: Object,
  options?: jwt.SignOptions | undefined
) => {
  return jwt.sign(payload, privateKey, {
    ...(options && options),
    algorithm: 'RS256', // allow us to use public and private keys
  });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKey);

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    };
  }
};
