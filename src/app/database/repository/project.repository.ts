import {projectModal} from '../models';
import {
  CreateProjectParams,
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
      created_at: new Date(),
      name,
      created_by: userId,
      users: [{user_id: userId, access_level: ProjectAccessLevel.ADMIN}],
    });
    if (!response.acknowledged) {
      throw new Error('Failed to insert project data');
    }
    return {projectId: response.insertedId};
  }

  async addProjectUser({projectId, userId, accessLevel}: ProjectUserParams) {
    const projectUser: ProjectUser = {
      access_level: accessLevel,
      user_id: userId,
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
      {_id: projectId, 'users.user_id': userId},
      {$set: {'users.$.access_level': updatedAccess}}
    );

    if (!response.acknowledged || response.modifiedCount !== 1) {
      throw new Error('Failed to update project data');
    }
  }
}

export const projectRepository = new ProjectRepository();
