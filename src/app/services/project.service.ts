import {projectRepository} from '../database';
import {
  AddProjectUserParams,
  CreateProjectParams,
  GetProjectParams,
  GetProjectListResult,
  ProjectServiceInterface,
  UpdateProjectParams,
  HasAccessParams,
  HasEditAccessToProjectParams,
} from '@i/services/project.service.interface';
import {rolesService} from './roles.service';
import {ProjectAccessLevel} from '../config';

class ProjectService implements ProjectServiceInterface {
  private readonly repository = projectRepository;

  async hasAccessToCreateProject({roleId}: HasAccessParams): Promise<boolean> {
    const respose = await rolesService.getModuleRoleInfo({
      roleId,
      module: 'projects',
    });
    return respose?.write || false;
  }

  async hasAccessToReadProject({roleId}: HasAccessParams): Promise<boolean> {
    const respose = await rolesService.getModuleRoleInfo({
      roleId,
      module: 'projects',
    });
    return respose?.read || false;
  }

  async hasEditAccessToProject({
    projectId,
    userId,
  }: HasEditAccessToProjectParams): Promise<boolean> {
    const access = await this.repository.getAccessLevelToProject({
      projectId,
      userId,
    });

    if (!access) return false;

    return [ProjectAccessLevel.ADMIN, ProjectAccessLevel.WRITE].includes(
      access
    );
  }

  async createProject({name, userId}: CreateProjectParams) {
    const {projectId} = await this.repository.createProject({
      name,
      userId,
    });
    return {projectId};
  }

  addProjectUser({}: AddProjectUserParams): Promise<void> {
    throw new Error('Method not implemented.');
  }

  async getProjectList({
    userId,
  }: GetProjectParams): Promise<GetProjectListResult> {
    return await this.repository.getProjectList({userId});
  }

  async updateProject({name, projectId}: UpdateProjectParams): Promise<void> {
    await this.repository.updateProject({name, projectId});
  }
}

export const projecService = new ProjectService();
