import {Document, ObjectId} from 'mongodb';

export interface VariableSchema extends Document {
  key: string;
  value: string;
  environment_id: ObjectId;
  override_user_id?: ObjectId;
  created_at: Date;
}
