import {ObjectId} from 'mongodb';
import {environmentRepository} from '../database';

class EnvironmentService {
  repository = environmentRepository;

  async createEnvironment({
    name,
    projectId,
    userId,
  }: {
    name: string;
    userId: ObjectId | string;
    projectId: ObjectId | string;
  }) {
    const {environmentId} = await this.repository.createEnvironment({
      name,
      projectId: new ObjectId(projectId),
      userId: new ObjectId(userId),
    });

    return {environmentId};
  }
}

export const environmentService = new EnvironmentService();
