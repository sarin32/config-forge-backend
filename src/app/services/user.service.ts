import {ObjectId} from 'mongodb';
import {userRepository} from '../database';
import {VERIFIED_USER_ROLE_ID} from '../config';

type getUserInfoParams = {
  userId: string;
};

class UserService {
  private readonly repository = userRepository;

  async getUserInfo({userId}: getUserInfoParams) {
    const user = await this.repository.findUserById({id: new ObjectId(userId)});

    if (!user) throw new Error('Invalid user id');

    return user;
  }

  async markUserAsVerified({userId}: {userId: ObjectId}) {
    await this.repository.markUserAsVerified({
      userId,
      roleId: VERIFIED_USER_ROLE_ID,
    });
  }
}

export const userService = new UserService();
