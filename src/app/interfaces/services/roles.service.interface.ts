import {
  GetRoleInfoParams as GetRoleInfoRepositoryParams,
  GetRoleInfoResult as GetRoleInfoRepositoryResult,
} from '@i/database/repository/role.repository.interface';
import {ObjectId} from 'mongodb';

type GetRoleInfoParams = GetRoleInfoRepositoryParams;
type GetRoleInfoResult = GetRoleInfoRepositoryResult;

export interface HasAccessParams {
  roleId: ObjectId;
}

export type HasAccessResult = Promise<boolean>;

export interface RoleServiceInterface {
  getRoleInfo(params: GetRoleInfoParams): Promise<GetRoleInfoResult>;

  hasAccessToSendEmailVerificationEmail(
    params: HasAccessParams
  ): HasAccessResult;

  hasAccessToCreateProject(params: HasAccessParams): HasAccessResult;

  hasAccessToReadProject(params: HasAccessParams): HasAccessResult;
}
