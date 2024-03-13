import {environmentModal} from '../modals';
import {
  CreateEnvironmentParams,
  EnvironmentRepositoryInterface,
} from '@i/database/repository/environment.repository.interface';

class EnvironmentRepository implements EnvironmentRepositoryInterface {
  private modal = environmentModal;

  async createEnvironment({name, userId, projectId}: CreateEnvironmentParams) {
    const response = await this.modal.insertOne({
      created_at: new Date(),
      name,
      project_id: projectId,
      created_by: userId,
    });
    if (!response.acknowledged) {
      throw new Error('Failed to insert environment data');
    }
    return {environmentId: response.insertedId};
  }
}

export const environmentRepository = new EnvironmentRepository();
