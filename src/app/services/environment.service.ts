import {ObjectId} from '@i/common.interface';
import {environmentRepository} from '../database';

class EnvironmentService {
  private repository = environmentRepository;

  async createEnvironment({
    name,
    projectId,
    userId,
  }: {
    name: string;
    userId: ObjectId;
    projectId: ObjectId;
  }) {
    const {environmentId} = await this.repository.createEnvironment({
      name,
      projectId,
      userId,
    });

    return {environmentId};
  }
}

export const environmentService = new EnvironmentService();
