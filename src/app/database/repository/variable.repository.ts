import {ObjectId} from 'mongodb';
import {VariableSchema, variableModal} from '../models';

export interface CreateVariable {
  overrideUserId?: ObjectId;
  environmentId: ObjectId;
  key: string;
  value: string;
}
class VariableRepository {
  private modal = variableModal;

  async createVariable({
    overrideUserId,
    environmentId,
    key,
    value,
  }: CreateVariable) {
    const inserObj: VariableSchema = {
      created_at: new Date(),
      environment_id: environmentId,
      key,
      value,
    };
    if (overrideUserId) inserObj.override_user_id = overrideUserId;

    const response = await this.modal.insertOne(inserObj);
    if (!response.acknowledged) {
      throw new Error('Failed to insert variable data');
    }

    return {projectId: response.insertedId};
  }
}

export const variableRepository = new VariableRepository();
