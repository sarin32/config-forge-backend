import { ObjectId } from "mongodb";



export interface CreateProjectParams {
  name: string;
  userId: ObjectId | string;
}

export interface CreateProjectResult {
  projectId: ObjectId
}

export interface AddProjectUserParams {
  name: string;
  userId: ObjectId | string;
}

export interface GetProjectParams {
  userId: ObjectId | string
}

export interface ProjectInfo {
  projectId: ObjectId,
  createdAt: Date,
  environmentCount: number,
  name: string
}

export type GetProjectListResult = ProjectInfo[]



export type AddProjectUserResult = void

export interface ProjectServiceInterface {

  createProject(params: CreateProjectParams): Promise<CreateProjectResult>

  getProjectList(params: GetProjectParams): Promise<GetProjectListResult>

  addProjectUser(params: AddProjectUserParams): Promise<AddProjectUserResult>


}
