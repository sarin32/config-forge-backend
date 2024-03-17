import {Document, ObjectId} from 'mongodb';

export enum ProjectAccessLevel {
  READ = 'read',
  WRITE = 'write',
  ADMIN = 'admin',
}

export interface ProjectUser {
  userId: ObjectId;
  accessLevel: ProjectAccessLevel;
}

export interface ProjectSchema extends Document {
  name: string;
  createdAt: Date;
  createdBy: ObjectId;
  users: ProjectUser[];
  environmentCount: number
}
