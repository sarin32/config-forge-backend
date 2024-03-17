import {
  GetModulePermissionInfoParams,
  GetModulePermissionInfoResult,
  GetRoleInfoParams,
  ModuleName,
  RoleRepositoryInterface,
} from '@i/database/repository/role.repository.interface';
import {roleModal} from '../modals';
import {RolesSchema} from '@i/database/modals/roles.modal.interface';

class RoleRepository implements RoleRepositoryInterface {
  modal = roleModal;

  async getRoleInfo({roleId}: GetRoleInfoParams): Promise<RolesSchema> {
    const role = await this.modal.findOne({_id: roleId});

    if (!role) throw new Error('No role found with the given id');

    return role;
  }

  async getModuleRoleInfo<ModuleNameT extends ModuleName>({
    roleId,
    module,
  }: GetModulePermissionInfoParams<ModuleNameT>): Promise<
    GetModulePermissionInfoResult<ModuleNameT>
  > {
    const moduleKey = `permissions.${module}`;

    const projection: Record<string, number> = {};
    projection[moduleKey] = 1;

    const role = await this.modal.findOne({_id: roleId}, {projection});

    if (!role) throw new Error('No role found with the given id');

    return role.permissions[module];
  }
}

export const roleRepository = new RoleRepository();
