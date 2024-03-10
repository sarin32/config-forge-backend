import {ObjectId} from 'mongodb';
import {CreateVariable, variableRepository} from '../database';

class VariableService {
  private readonly repository = variableRepository;

  async createVariable({
    environmentId,
    key,
    value,
    userId,
    isOverride = false,
  }: {
    environmentId: string | ObjectId;
    key: string;
    value: string;
    userId?: ObjectId;
    isOverride: boolean;
  }) {
    const variableObject: CreateVariable = {
      environmentId: new ObjectId(environmentId),
      key,
      value,
    };

    if (isOverride) variableObject.overrideUserId = userId;

    await this.repository.createVariable(variableObject);
  }
}

export const variableService = new VariableService();
