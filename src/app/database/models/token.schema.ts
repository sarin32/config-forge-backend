import {Document, ObjectId} from 'mongodb';

export interface TokenSchema extends Document {
  name: string;
  token: string;
  user_id: ObjectId;
  is_active: ObjectId;
  expires_on: Date;
  created_at: Date;
}
