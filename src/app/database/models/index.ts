import connection from '../connection';
import { AccessSchema } from './access.schema';
import {EmailVerificationSchema} from './email-verification.schema';
import { EnvironmentSchema } from './environment.schema';
import { ProjectSchema } from './project.schema';
import { TokenSchema } from './token.schema';
import {UserSchema} from './user.schema';
import { VariableSchema } from './variable.schema';

export const userModal = connection.getCollection<UserSchema>('users');
export const emailVerificationModal = connection.getCollection<EmailVerificationSchema>('email_verifications');
export const accessModal = connection.getCollection<AccessSchema>('access');
export const projectModal = connection.getCollection<ProjectSchema>('projects');
export const environmentModal = connection.getCollection<EnvironmentSchema>('environments');
export const tokenModal = connection.getCollection<TokenSchema>('tokens');
export const variableModal = connection.getCollection<VariableSchema>('variables');
