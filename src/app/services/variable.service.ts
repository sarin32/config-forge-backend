import {ObjectId} from '@i/common.interface';
import {variableRepository} from '../database';
import {CreateVariableParams} from '@i/database/repository/variablerepository.interface';

class VariableService {
  private readonly repository = variableRepository;

  async createVariable({
    environmentId,
    key,
    value,
    userId,
    isOverride = false,
  }: {
    environmentId: ObjectId;
    key: string;
    value: string;
    userId?: ObjectId;
    isOverride: boolean;
  }) {
    const variableObject: CreateVariableParams = {
      environmentId,
      key,
      value,
    };

    if (isOverride) variableObject.overrideUserId = userId;

    await this.repository.createVariable(variableObject);
  }
}

export const variableService = new VariableService();
