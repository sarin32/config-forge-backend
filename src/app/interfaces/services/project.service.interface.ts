import {ObjectId} from '@i/common.interface';

export interface CreateProjectParams {
  name: string;
  userId: ObjectId;
}

export interface CreateProjectResult {
  projectId: ObjectId;
}

export interface AddProjectUserParams {
  name: string;
  userId: ObjectId;
}

export interface GetProjectParams {
  userId: ObjectId;
}

export interface ProjectInfo {
  projectId: ObjectId;
  createdAt: Date;
  environmentCount: number;
  name: string;
}

export type GetProjectListResult = ProjectInfo[];

export type AddProjectUserResult = void;

export interface ProjectServiceInterface {
  createProject(params: CreateProjectParams): Promise<CreateProjectResult>;

  getProjectList(params: GetProjectParams): Promise<GetProjectListResult>;

  addProjectUser(params: AddProjectUserParams): Promise<AddProjectUserResult>;
}
