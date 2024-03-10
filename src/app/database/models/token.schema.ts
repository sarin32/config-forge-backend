import {Document, ObjectId} from 'mongodb';

export interface TokenSchema extends Document {
  name: string;
  token: string;
  environmentId: ObjectId
  user_id?: ObjectId;
  is_active: boolean;
  expires_on: Date;
  created_at: Date;
}
