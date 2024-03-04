import {LOGIN_TOKEN_LIFETIME} from '../config/config';
import {userRepository} from '../database';
import {AuthorizationError} from '../errors';
import {
  validatePassword,
} from '../utils/password-util';
import {generateSignature} from '../utils/token-util';


type SignInParams = {
  email: string;
  password: string;
};


class LoginService {
  private readonly repository = userRepository;

  async signIn({email, password}: SignInParams) {
    const user = await this.repository.findUserByEmail({email});
    if (!user) throw new AuthorizationError('Invalid Credenials');

    const isValidPassword = await validatePassword(
      password,
      user.password,
      user.salt
    );
    if (!isValidPassword) throw new AuthorizationError('Invalid Credenials');

    const payload = {
      userId: user._id,
    };
    const token = await generateSignature(payload, LOGIN_TOKEN_LIFETIME);
    return {
      userId: user._id,
      token: `Bearer ${token}`,
    };
  }

}

export const loginService = new LoginService();
