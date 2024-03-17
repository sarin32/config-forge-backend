import {NON_VERIFIED_USER_ROLE_ID} from '../config';
import {LOGIN_TOKEN_LIFETIME} from '../config/config';
import {userRepository} from '../database';
import {AuthorizationError, ConflictError} from '../errors';
import {
  generatePassword,
  generateSalt,
  validatePassword,
} from '../utils/password-util';
import {generateSignature} from '../utils/token-util';

type SignupParams = {
  email: string;
  password: string;
  name: string;
};

type SignInParams = {
  email: string;
  password: string;
};

class UserAuthService {
  private readonly repository = userRepository;

  async signup({email, name, password}: SignupParams) {
    const salt = await generateSalt();
    password = await generatePassword(password, salt);

    const isUserExists = await this.repository.isUserExistsWithEmail({email});
    if (isUserExists)
      throw new ConflictError('An account with this email id already exists');

    const roleId = NON_VERIFIED_USER_ROLE_ID;

    const {id} = await this.repository.createUser({
      email,
      name,
      password,
      salt,
      roleId: NON_VERIFIED_USER_ROLE_ID,
    });

    const payload = {
      userId: id,
      roleId,
    };
    const token = await generateSignature(payload, LOGIN_TOKEN_LIFETIME);

    return {
      userId: id,
      token: `Bearer ${token}`,
    };
  }

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
      roleId: user.roleId
    };
    const token = await generateSignature(payload, LOGIN_TOKEN_LIFETIME);
    return {
      userId: user._id,
      token: `Bearer ${token}`,
    };
  }
}

export const userAuthService = new UserAuthService();
