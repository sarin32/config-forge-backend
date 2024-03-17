import {projectRepository} from '../database';
import {
  AddProjectUserParams,
  CreateProjectParams,
  GetProjectParams,
  GetProjectListResult,
  ProjectServiceInterface,
} from '@i/services/project.service.interface';

class ProjectService implements ProjectServiceInterface {
  private readonly repository = projectRepository;

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
}

export const projecService = new ProjectService();
