import {Document, ObjectId} from 'mongodb';

export enum ProjectAccessLevel {
  READ = 'read',
  WRITE = 'write',
  ADMIN = 'admin',
}

export interface ProjectUser {
  user_id: ObjectId;
  access_level: ProjectAccessLevel;
}

export interface ProjectSchema extends Document {
  name: string;
  created_at: Date;
  created_by: ObjectId;
  users: ProjectUser[];
}
