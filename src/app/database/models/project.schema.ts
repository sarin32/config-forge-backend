import {Document} from 'mongodb';

export interface ProjectSchema extends Document {
  name: string;
  created_at: Date;
}
