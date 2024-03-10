import {ObjectId} from 'mongodb';
import {TokenSchema, tokenModal} from '../models';

export interface CreateToken {
  expiresOn: Date;
  name: string;
  token: string;
  userId?: ObjectId;
  environmentId: ObjectId;
}
class TokenRepository {
  private modal = tokenModal;

  async createToken({
    expiresOn,
    name,
    token,
    userId,
    environmentId,
  }: CreateToken) {
    const insertObject: TokenSchema = {
      created_at: new Date(),
      expires_on: expiresOn,
      is_active: true,
      name,
      token,
      environmentId,
    };
    if (userId) {
      insertObject.user_id = userId;
    }
    const response = await this.modal.insertOne(insertObject);

    if (!response.acknowledged) {
      throw new Error('Failed to insert token data');
    }

    return {projectId: response.insertedId};
  }

  async revokeToken(tokenId: ObjectId) {
    const response = await this.modal.updateOne(
      {_id: tokenId},
      {$set: {is_active: false}}
    );

    if (!response.acknowledged || response.modifiedCount != 1) {
      throw new Error('Could not update token details');
    }
  }

  async isValidToken(token: string) {
    const tokenData = await this.modal.findOne(
      {
        token,
        is_active: true,
        expires_on: {$gt: new Date()},
      },
      {projection: {_id: 1}}
    );

    return tokenData ? true : false;
  }
}

export const tokenRepository = new TokenRepository();
