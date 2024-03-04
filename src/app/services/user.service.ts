import {ObjectId} from 'mongodb';
import {userRepository} from '../database';

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
}

export const userService = new UserService();
