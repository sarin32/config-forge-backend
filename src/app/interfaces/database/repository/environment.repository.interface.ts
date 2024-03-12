import {ObjectId} from 'mongodb';

export interface CreateEnvironmentParams {
  name: string;
  userId: ObjectId;
  projectId: ObjectId;
}

export interface EnvironmentRepositoryInterface {
  createEnvironment(
    params: CreateEnvironmentParams
  ): Promise<{environmentId: ObjectId}>;
}
