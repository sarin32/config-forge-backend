import {Context} from 'koa';
import {projecService} from '../../services/project.service';
import {
  objectIdSchema,
  objectSchema,
  stringSchema,
  validateObject,
} from '../../utils/schema-validator';
import {BadRequestError, ForbiddenError} from '../../errors';
import {objectId} from '../../utils/data-type-util';

const createProjectSchema = objectSchema({
  object: {
    name: stringSchema({min: 1}),
  },
});

const updateProjectSchema = objectSchema({
  object: {
    name: stringSchema({min: 1}),
    projectId: objectIdSchema(),
  },
});

export async function createProject(ctx: Context) {
  const {error, value} = validateObject<{name: string}>(
    createProjectSchema,
    ctx.request.body
  );

  if (error) throw new BadRequestError(error.message);

  const {userId, roleId} = ctx.state.user;

  if (!(await projecService.hasAccessToCreateProject({roleId})))
    throw new ForbiddenError('You dont have the access to create project ');

  const {name} = value;

  ctx.body = await projecService.createProject({userId, name});
}

export async function getProjectlist(ctx: Context) {
  const {userId, roleId} = ctx.state.user;

  if (!(await projecService.hasAccessToReadProject({roleId})))
    throw new ForbiddenError('You dont have the access to read project ');

  ctx.body = await projecService.getProjectList({userId});
}

export async function updateProjectDetails(ctx: Context) {
  const {userId, roleId} = ctx.state.user;

  if (!(await projecService.hasAccessToCreateProject({roleId})))
    throw new ForbiddenError('You dont have the access to update projects');

  const {error, value} = validateObject<{name: string; projectId: string}>(
    updateProjectSchema,
    ctx.request.body
  );

  const {name, projectId} = value;

  if (error) throw new BadRequestError(error.message);

  if (
    !(await projecService.hasEditAccessToProject({
      projectId: objectId(projectId),
      userId,
    }))
  )
    throw new ForbiddenError('You dont have the access to this project');

  ctx.body = await projecService.updateProject({
    // userId,
    name,
    projectId: objectId(projectId),
  });
}
