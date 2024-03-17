import {projectModal} from '../modals';
import {
  CreateProjectParams,
  GetProjectListParams,
  GetProjectListResult,
  ProjectRepositoryInterface,
  ProjectUserParams,
  UpdateProjectAccessParams,
} from '@i/database/repository/project.repository.interface';
import {
  ProjectAccessLevel,
  ProjectUser,
} from '../../interfaces/database/modals/project.modal.interface';

class ProjectRepository implements ProjectRepositoryInterface {
  private modal = projectModal;

  async createProject({name, userId}: CreateProjectParams) {
    const response = await this.modal.insertOne({
      createdAt: new Date(),
      name,
      createdBy: userId,
      users: [{userId: userId, accessLevel: ProjectAccessLevel.ADMIN}],
      environmentCount: 0,
    });

    if (!response.acknowledged) {
      throw new Error('Failed to insert project data');
    }
    return {projectId: response.insertedId};
  }

  async addProjectUser({projectId, userId, accessLevel}: ProjectUserParams) {
    const projectUser: ProjectUser = {
      accessLevel: accessLevel,
      userId: userId,
    };

    const response = await this.modal.updateOne(
      {_id: projectId},
      {users: {$push: projectUser}}
    );

    if (!response.acknowledged || response.modifiedCount !== 1) {
      throw new Error('Failed to update project data');
    }
  }

  async updateProjectAccess({
    projectId,
    updatedAccess,
    userId,
  }: UpdateProjectAccessParams) {
    const response = await this.modal.updateOne(
      {_id: projectId, 'users.userId': userId},
      {$set: {'users.$.accessLevel': updatedAccess}}
    );

    if (!response.acknowledged || response.modifiedCount !== 1) {
      throw new Error('Failed to update project data');
    }
  }

  async getProjectList({
    userId,
  }: GetProjectListParams): Promise<GetProjectListResult> {
    const list = await this.modal
      .find(
        {
          users: {$elemMatch: {userId: userId}},
        },
        {projection: {createdAt: 1, environmentCount: 1, name: 1}}
      )
      .toArray();

    return list.map(elem => {
      return {
        projectId: elem._id,
        createdAt: elem.createdAt,
        environmentCount: elem.environmentCount,
        name: elem.name,
      };
    });
  }
}

export const projectRepository = new ProjectRepository();
