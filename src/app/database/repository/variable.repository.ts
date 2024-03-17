import {ObjectId} from 'mongodb';
import {variableModal} from '../modals';
import {VariableSchema} from '@i/database/modals/variable.modal.interface';

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
      createdAt: new Date(),
      environmentId: environmentId,
      key,
      value,
    };
    if (overrideUserId) inserObj.overrideUserId = overrideUserId;

    const response = await this.modal.insertOne(inserObj);
    if (!response.acknowledged) {
      throw new Error('Failed to insert variable data');
    }

    return {projectId: response.insertedId};
  }
}

export const variableRepository = new VariableRepository();
