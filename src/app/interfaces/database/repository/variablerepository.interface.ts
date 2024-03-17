import {ObjectId} from '@i/common.interface';

export interface CreateVariableParams {
  overrideUserId?: ObjectId;
  environmentId: ObjectId;
  key: string;
  value: string;
}

export interface CreateVariableResult {
  variableId: ObjectId;
}

export interface VariableRepositoryInterface {
  createVariable(params: CreateVariableParams): Promise<CreateVariableResult>;
}
