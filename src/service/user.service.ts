import { omit } from 'lodash';
import UserModel, { UserDocument, UserInput } from '../models/user.model';
import { FilterQuery } from 'mongoose';

export async function createUser(input: UserInput) {
  try {
    const user = await UserModel.create(input);

    return omit(user.toJSON(), 'password');
  } catch (e: any) {
    throw new Error(e);
  }
}
export async function validatePassword({
  email,
  password,
}: {
  email: string;
  password: string;
}) {
  const user = await UserModel.findOne({ email });

  if (!user) {
    return false;
  }

  const isValid = await user.comparePassword(password);

  if (!isValid) return false;

  // Omit sensitive fields from the user object (e.g., password) before returning
  return omit(user.toJSON(), 'password');
}

export async function findUser(query: FilterQuery<UserDocument>) {
  return UserModel.findOne(query).lean();
}
