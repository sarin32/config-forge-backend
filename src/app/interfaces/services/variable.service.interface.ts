import {ObjectId} from '@i/common.interface';
import {GetVariableListObject as GetVariableListRepoObject} from '@i/database/repository/variablerepository.interface';

export interface CreateVariableParams {
  environmentId: ObjectId;
  key: string;
  value: string;
  userId?: ObjectId;
  isOverride: boolean;
}

export interface GetVariableListParams {
  userId: ObjectId;
  environmentId: ObjectId;
}
export type GetVariableListObject = GetVariableListRepoObject;

export interface VariableServiceInterface {
  createVariable(params: CreateVariableParams): Promise<void>;

  getVariableList(
    params: GetVariableListParams
  ): Promise<GetVariableListObject[]>;
}
