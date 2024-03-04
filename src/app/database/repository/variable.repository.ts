import {ObjectId} from 'mongodb';
import {VariableSchema, variableModal} from '../models';

class VariableRepository {
  private modal = variableModal;

  async createProject({
    userId,
    environmentId,
    key,
    value,
  }: {
    userId?: ObjectId;
    environmentId: ObjectId;
    key: string;
    value: string;
  }) {
    const inserObj: VariableSchema = {
      created_at: new Date(),
      environment_id: environmentId,
      key,
      value,
    };
    if (userId) inserObj.user_id = userId;

    const response = await this.modal.insertOne(inserObj);
    if (!response.acknowledged) {
      throw new Error('Failed to insert variable data');
    }

    return {projectId: response.insertedId};
  }
}

export const variableRepository = new VariableRepository();
