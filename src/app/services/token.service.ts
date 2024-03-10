import {ObjectId} from 'mongodb';
import {tokenRepository} from '../database';

class TokenService {
  private readonly repository = tokenRepository;

  async authenticateToken({token}: {token: string}) {
    return await this.repository.isValidToken(token);
  }

  async revokeToken({tokenId}: {tokenId: string | ObjectId}) {
    return await this.repository.revokeToken(new ObjectId(tokenId));
  }
}

export const variableService = new TokenService();
