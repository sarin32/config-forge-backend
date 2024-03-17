import {
  GetRoleInfoParams,
  GetRoleInfoResult,
} from '@i/database/repository/role.repository.interface';
import {
  HasAccessParams,
  HasAccessResult,
  RoleServiceInterface,
} from '@i/services/roles.service.interface';
import {roleRepository} from '../database';

class RolesService implements RoleServiceInterface {
  repository = roleRepository;

  async getRoleInfo({roleId}: GetRoleInfoParams): Promise<GetRoleInfoResult> {
    return await this.repository.getRoleInfo({roleId});
  }

  async hasAccessToSendEmailVerificationEmail({
    roleId,
  }: HasAccessParams): HasAccessResult {
    const respose = await this.repository.getModuleRoleInfo({
      roleId,
      module: 'emailVerification',
    });
    return respose?.send || false;
  }

  async hasAccessToCreateProject({roleId}: HasAccessParams): HasAccessResult {
    const respose = await this.repository.getModuleRoleInfo({
      roleId,
      module: 'projects',
    });
    return respose?.write || false;
  }

  async hasAccessToReadProject({roleId}: HasAccessParams): HasAccessResult {
    const respose = await this.repository.getModuleRoleInfo({
      roleId,
      module: 'projects',
    });
    return respose?.read || false;
  }
}

export const rolesService = new RolesService();
