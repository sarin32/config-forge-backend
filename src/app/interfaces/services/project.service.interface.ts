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

export interface HasAccessParams {
  roleId: ObjectId;
}

export interface HasEditAccessToProjectParams {
  projectId: ObjectId;
  userId: ObjectId;
}

export type GetProjectListResult = ProjectInfo[];

export interface UpdateProjectParams {
  projectId: ObjectId;
  name: string;
}
export interface ProjectServiceInterface {
  createProject(params: CreateProjectParams): Promise<CreateProjectResult>;

  getProjectList(params: GetProjectParams): Promise<GetProjectListResult>;

  addProjectUser(params: AddProjectUserParams): Promise<void>;

  updateProject(params: UpdateProjectParams): Promise<void>;

  hasAccessToCreateProject(params: HasAccessParams): Promise<boolean>;

  hasAccessToReadProject(params: HasAccessParams): Promise<boolean>;

  hasEditAccessToProject(
    params: HasEditAccessToProjectParams
  ): Promise<boolean>;
}
