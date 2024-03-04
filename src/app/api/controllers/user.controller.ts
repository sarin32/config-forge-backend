import {Context} from 'koa';
import {
  emailSchema,
  objectSchema,
  stringSchema,
  validateObject,
} from '../../utils/schema-validator';
import {userService} from '../../services/user.service';
import {BadRequestError} from '../../errors';
import {registrationService} from '../../services/registration.service';
import {loginService} from '../../services/login.service';

const signUpSchema = objectSchema({
  object: {
    name: stringSchema({min: 3, max: 20}),
    email: emailSchema(),
    password: stringSchema({min: 6, max: 30}),
  },
});

const signInSchema = objectSchema({
  object: {
    email: emailSchema(),
    password: stringSchema({min: 6, max: 30}),
  },
});

const verifyEmailVerificationOTPSchema = objectSchema({
  object: {
    otp: stringSchema({min: 6, max: 6}),
  },
});

export async function signUp(ctx: Context) {
  const {error, value} = validateObject(signUpSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const {name, email, password} = value;
  ctx.body = await registrationService.signup({name, email, password});
}

export async function signIn(ctx: Context) {
  const {error, value} = validateObject(signInSchema, ctx.request.body);

  if (error) throw new BadRequestError(error.message);

  const {email, password} = value;
  ctx.body = await loginService.signIn({email, password});
}

export async function sendEmailForVerification(ctx: Context) {
  const {userId} = ctx.state.user;
  ctx.body = await registrationService.sendEmailForVerification({userId});
}

export async function verifyEmailVerificationOTP(ctx: Context) {
  const {error, value} = validateObject(
    verifyEmailVerificationOTPSchema,
    ctx.request.body
  );

  if (error) throw new BadRequestError(error.message);

  const {userId} = ctx.state.user;
  const {otp} = value;

  ctx.body = await registrationService.verifyEmailVerificationOTP({
    userId,
    otp,
  });
}

export async function getSelfInfo(ctx: Context) {
  const {userId} = ctx.state.user;

  ctx.body = await userService.getUserInfo({userId});
}
