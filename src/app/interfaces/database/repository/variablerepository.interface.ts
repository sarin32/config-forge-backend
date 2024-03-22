import {ObjectId} from '@i/common.interface';
import {VariableSchema} from '../modals/variable.modal.interface';
import {WithId} from 'mongodb';

export interface CreateVariableParams {
  overrideUserId?: ObjectId;
  environmentId: ObjectId;
  key: string;
  value: string;
}

export interface CreateVariableResult {
  variableId: ObjectId;
}

export interface GetVariableListParams {
  userId: ObjectId;
  environmentId: ObjectId;
}
export type GetVariableListObject = WithId<VariableSchema>;

export interface VariableRepositoryInterface {
  createVariable(params: CreateVariableParams): Promise<CreateVariableResult>;

  getVariableList(
    params: GetVariableListParams
  ): Promise<GetVariableListObject[]>;
}
