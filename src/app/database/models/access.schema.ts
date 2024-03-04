import {Document, ObjectId} from 'mongodb';

export interface AccessSchema extends Document {
  access_resource: 'project' | 'environment';
  project_id?: ObjectId,
  environment_id?: ObjectId,
  access_level: 'read' | 'write' | 'admin'
}
