import {Context} from 'koa';
import {
  objectIdSchema,
  objectSchema,
  stringSchema,
  validateObject,
} from '../../utils/schema-validator';
import {BadRequestError} from '../../errors';
import {environmentService} from '../../services/environment.service';

const createEnvironmentSchema = objectSchema({
  object: {
    name: stringSchema({min: 1}),
    projectId: objectIdSchema(),
  },
});

export async function createEnvironment(ctx: Context) {
  const {error, value} = validateObject(
    createEnvironmentSchema,
    ctx.request.body
  );

  if (error) throw new BadRequestError(error.message);

  const {userId} = ctx.state.user;
  const {name, projectId} = value;

  ctx.body = await environmentService.createEnvironment({
    userId,
    projectId,
    name,
  });
}
