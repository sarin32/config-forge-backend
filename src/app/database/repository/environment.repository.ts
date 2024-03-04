import {ObjectId} from 'mongodb';
import {environmentModal} from '../models';

class EnvironmentRepository {
  modal = environmentModal;

  async createEnvironment({
    name,
    userId,
    projectId,
  }: {
    name: string;
    userId: ObjectId;
    projectId: ObjectId;
  }) {
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
