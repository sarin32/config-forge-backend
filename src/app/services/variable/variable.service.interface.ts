import { ObjectId } from '@i/common.interface';
import { GetVariableListObject as GetVariableListRepoObject } from '../../database/repository/variable/variable.repository.interface';

export interface CreateVariableParams {
  environmentId: ObjectId;
  key: string;
  value: string;
  userId?: ObjectId;
  isOverride: boolean;
}

export interface CreateVariableResponse {
  variableId: ObjectId;
}

export interface GetVariableListParams {
  userId: ObjectId;
  environmentId: ObjectId;
}
export type GetVariableListObject = GetVariableListRepoObject;

export interface VariableServiceInterface {
  createVariable(params: CreateVariableParams): Promise<CreateVariableResponse>;

  getVariableList(
    params: GetVariableListParams
  ): Promise<GetVariableListObject[]>;
}
