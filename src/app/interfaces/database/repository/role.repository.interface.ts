import {ObjectId} from 'mongodb';
import {RolePermissions, RolesSchema} from '../modals/roles.modal.interface';

export interface GetRoleInfoParams {
  roleId: ObjectId;
}

export type ModuleName = keyof RolePermissions;

export interface GetModulePermissionInfoParams<ModuleNameT extends ModuleName> {
  roleId: ObjectId;
  module: ModuleNameT;
}

export type GetModulePermissionInfoResult<ModuleNameT extends ModuleName> =
  RolePermissions[ModuleNameT];

export type GetRoleInfoResult = RolesSchema;

export interface RoleRepositoryInterface {
  getRoleInfo(params: GetRoleInfoParams): Promise<GetRoleInfoResult>;

  getModuleRoleInfo<ModuleNameT extends ModuleName>(
    params: GetModulePermissionInfoParams<ModuleNameT>
  ): Promise<GetModulePermissionInfoResult<ModuleNameT>>;
}
