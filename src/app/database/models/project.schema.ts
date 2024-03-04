import {Document, ObjectId} from 'mongodb';

export interface ProjectSchema extends Document {
  name: string;
  created_at: Date;
  created_by: ObjectId;
}
