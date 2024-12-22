import {
  CreateVariableParams,
  CreateVariableResult,
  GetVariableListObject,
  GetVariableListParams,
  VariableRepositoryInterface,
} from './variable.repository.interface';
import { variableModal } from '../../modals';
import { VariableSchema } from '../../modals/variable.modal.interface';

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

    return { variableId: response.insertedId };
  }

  async getVariableList({
    environmentId,
    userId,
  }: GetVariableListParams): Promise<GetVariableListObject[]> {
    return await this.modal
      .find({
        environmentId,
        overrideUserId: { $in: [userId, undefined] },
      })
      .toArray();
  }
}

export const variableRepository = new VariableRepository();
