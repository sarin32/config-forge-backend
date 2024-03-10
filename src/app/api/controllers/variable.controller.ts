import {Context} from 'koa';
import {
  booleanSchema,
  objectIdSchema,
  objectSchema,
  stringSchema,
  validateObject,
} from '../../utils/schema-validator';
import {BadRequestError} from '../../errors';
import {variableService} from '../../services/variable.service';

const createVariableSchema = objectSchema({
  object: {
    environmentId: objectIdSchema(),
    key: stringSchema({min: 1}),
    value: stringSchema({required: false}),
    isOverride: booleanSchema(false),
  },
});

export async function createVariable(ctx: Context) {
  const {error, value} = validateObject<{
    environmentId: string;
    key: string;
    value: string;
    isOverride?: boolean;
  }>(createVariableSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const {userId} = ctx.state.user;
  const {environmentId, key, value: variableValue, isOverride} = value;

  ctx.body = await variableService.createVariable({
    userId,
    environmentId,
    key,
    value: variableValue,
    isOverride: isOverride || false,
  });
}
