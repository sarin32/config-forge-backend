import {Context} from 'koa';
import {projecService} from '../../services/project.service';
import {
  objectSchema,
  stringSchema,
  validateObject,
} from '../../utils/schema-validator';
import {BadRequestError} from '../../errors';

const createProjectSchema = objectSchema({
  object: {
    name: stringSchema({min: 1}),
  },
});

export async function createProject(ctx: Context) {
  const {error, value} = validateObject(createProjectSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const {userId} = ctx.state.user;
  const {name} = value;

  ctx.body = await projecService.createProject({userId, name});
}
