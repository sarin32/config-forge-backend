import {Document, ObjectId} from 'mongodb';

export interface EnvironmentSchema extends Document {
  name: string;
  project_id: ObjectId;
  created_at: Date;
}
