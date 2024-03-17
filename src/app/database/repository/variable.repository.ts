import {
  CreateVariableParams,
  CreateVariableResult,
  VariableRepositoryInterface,
} from '@i/database/repository/variablerepository.interface';
import {variableModal} from '../modals';
import {VariableSchema} from '@i/database/modals/variable.modal.interface';

class VariableRepository implements VariableRepositoryInterface {
  private modal = variableModal;

  async createVariable({
    overrideUserId,
    environmentId,
    key,
    value,
  }: CreateVariableParams): Promise<CreateVariableResult> {
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

    return {variableId: response.insertedId};
  }
}

export const variableRepository = new VariableRepository();
