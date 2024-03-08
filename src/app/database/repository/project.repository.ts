import {ObjectId} from 'mongodb';
import {projectModal} from '../models';

class ProjectRepository {
  private modal = projectModal;

  async createProject({name, userId}: {name: string; userId: ObjectId}) {
    const response = await this.modal.insertOne({
      created_at: new Date(),
      name,
      created_by: userId,
    });
    if (!response.acknowledged) {
      throw new Error('Failed to insert project data');
    }
    return {projectId: response.insertedId};
  }
}

export const projectRepository = new ProjectRepository();
