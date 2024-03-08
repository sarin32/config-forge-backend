import {ObjectId} from 'mongodb';
import {variableRepository} from '../database';

class VariableService {
  private readonly repository = variableRepository;

  async createVariable({
    environmentId,
    key,
    value,
    userId,
  }: {
    environmentId: string | ObjectId;
    key: string;
    value: string;
    userId?: ObjectId;
  }) {
    this.repository.createProject({
      environmentId: new ObjectId(environmentId),
      key,
      value,
      userId,
    });
  }
}

export const variableService = new VariableService();
