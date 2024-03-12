import {ObjectId} from 'mongodb';
import {UserSchema} from '../modals/user.modal.interface';

export type CreateUserParams = {
  email: string;
  name: string;
  password: string;
  salt: string;
};

export type FindUserByEmailParams = {
  email: string;
};

export type FindUserByIdParams = {
  id: ObjectId;
};

export interface UserRepositoryInterface {
  createUser(params: CreateUserParams): Promise<{id: ObjectId}>;

  findUserByEmail(params: FindUserByEmailParams): Promise<UserSchema | null>;

  isUserExistsWithEmail(params: FindUserByEmailParams): Promise<boolean>;

  findUserById(params: FindUserByIdParams): Promise<UserSchema | null>;

  markUserAsVerified(params: {userID: ObjectId}): Promise<UserSchema | null>;
}
