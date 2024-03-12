import {ObjectId} from 'mongodb';
import {projectRepository} from '../database';

class ProjectService {
  private readonly repository = projectRepository;

  async createProject({
    name,
    userId,
  }: {
    name: string;
    userId: ObjectId | string;
  }) {
    const {projectId} = await this.repository.createProject({
      name,
      userId: new ObjectId(userId),
    });
    return {projectId};
  }

  async addProjectUser({
    name,
    userId,
  }: {
    name: string;
    userId: ObjectId | string;
  }) {
    const {projectId} = await this.repository.createProject({
      name,
      userId: new ObjectId(userId),
    });
    return {projectId};
  }
}

export const projecService = new ProjectService();
