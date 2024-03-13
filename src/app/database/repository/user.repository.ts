import {ObjectId} from 'mongodb';
import {userModal} from '../modals';
import {
  CreateUserParams,
  FindUserByEmailParams,
  FindUserByIdParams,
  UserRepositoryInterface,
} from '@i/database/repository/user.repository.interface';

class UserRepository implements UserRepositoryInterface {
  private readonly modal = userModal;

  async createUser({email, name, password, salt}: CreateUserParams) {
    const result = await this.modal.insertOne({
      email,
      name,
      password,
      salt,
      created_at: new Date(),
      is_verified: false,
    });

    if (!result.acknowledged) {
      throw new Error('Failed to create user');
    }

    return {
      id: result.insertedId,
    };
  }

  async findUserByEmail({email}: FindUserByEmailParams) {
    const result = await this.modal.findOne({
      email,
    });

    return result;
  }

  async isUserExistsWithEmail({email}: FindUserByEmailParams) {
    const result = await this.modal.findOne(
      {
        email,
        is_verified: true,
      },
      {projection: {_id: 1}}
    );

    return Boolean(result);
  }

  async findUserById({id}: FindUserByIdParams) {
    const result = await this.modal.findOne(
      {
        _id: id,
      },
      {projection: {password: 0, salt: 0}}
    );

    return result;
  }

  async markUserAsVerified({userID}: {userID: ObjectId}) {
    return await this.modal.findOneAndUpdate(
      {_id: userID},
      {$set: {is_verified: true}}
    );
  }
}

export const userRepository = new UserRepository();
