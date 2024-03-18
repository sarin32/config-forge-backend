import {ObjectId} from 'mongodb';
import {ProjectAccessLevel} from '../../../config';

export interface CreateProjectParams {
  name: string;
  userId: ObjectId;
}

export interface ProjectUserParams {
  projectId: ObjectId;
  userId: ObjectId;
  accessLevel: ProjectAccessLevel;
}

export interface UpdateProjectAccessParams {
  projectId: ObjectId;
  updatedAccess: ProjectAccessLevel;
  userId: ObjectId;
}

export interface ProjectInfo {
  projectId: ObjectId;
  name: string;
  createdAt: Date;
  environmentCount: number;
}

export type GetProjectListResult = ProjectInfo[];

export interface GetProjectListParams {
  userId: ObjectId;
}

export interface UpdateProjectParams {
  projectId: ObjectId;
  name: string;
}

export interface GetAccessLevelToProjectParams {
  projectId: ObjectId;
  userId: ObjectId;
}

export type GetAccessLevelToProjectResult = ProjectAccessLevel | undefined;

export interface ProjectRepositoryInterface {
  createProject(params: CreateProjectParams): Promise<{projectId: ObjectId}>;

  addProjectUser(params: ProjectUserParams): Promise<void>;

  updateProjectAccess(params: UpdateProjectAccessParams): Promise<void>;

  getProjectList(paams: GetProjectListParams): Promise<GetProjectListResult>;

  updateProject(params: UpdateProjectParams): Promise<void>;

  getAccessLevelToProject(
    params: GetAccessLevelToProjectParams
  ): Promise<GetAccessLevelToProjectResult>;
}
