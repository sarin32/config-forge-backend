import {variableRepository} from '../database';
import {CreateVariableParams as CreateVariableRepoParams} from '@i/database/repository/variablerepository.interface';
import {
  CreateVariableParams,
  GetVariableListObject,
  GetVariableListParams,
  VariableServiceInterface,
} from '@i/services/variable.service.interface';

class VariableService implements VariableServiceInterface {
  private readonly repository = variableRepository;

  async createVariable({
    environmentId,
    key,
    value,
    userId,
    isOverride = false,
  }: CreateVariableParams) {
    const variableObject: CreateVariableRepoParams = {
      environmentId,
      key,
      value,
    };

    if (isOverride) variableObject.overrideUserId = userId;

    await this.repository.createVariable(variableObject);
  }

  async getVariableList({
    environmentId,
    userId,
  }: GetVariableListParams): Promise<GetVariableListObject[]> {
    return await this.repository.getVariableList({environmentId, userId});
  }
}

export const variableService = new VariableService();
