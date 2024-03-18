import {
  GetRoleInfoParams,
  GetRoleInfoResult,
} from '@i/database/repository/role.repository.interface';
import {
  GetModulePermissionInfoParams,
  GetModulePermissionInfoResult,
  RoleServiceInterface,
} from '@i/services/roles.service.interface';
import {roleRepository} from '../database';
import {RolePermissions} from '@i/database/modals/roles.modal.interface';

class RolesService implements RoleServiceInterface {
  repository = roleRepository;

  async getRoleInfo({roleId}: GetRoleInfoParams): Promise<GetRoleInfoResult> {
    return await this.repository.getRoleInfo({roleId});
  }

  async getModuleRoleInfo<ModuleNameT extends keyof RolePermissions>({
    module,
    roleId,
  }: GetModulePermissionInfoParams<ModuleNameT>): Promise<
    GetModulePermissionInfoResult<ModuleNameT>
  > {
    return await this.repository.getModuleRoleInfo({module, roleId});
  }
}

export const rolesService = new RolesService();
