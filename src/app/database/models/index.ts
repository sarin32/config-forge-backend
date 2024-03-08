import {
  COLLECTION_ACCESS,
  COLLECTION_EMAIL_VERIFICATIONS,
  COLLECTION_ENVIRONMENTS,
  COLLECTION_PROJECTS,
  COLLECTION_TOKENS,
  COLLECTION_USERS,
  COLLECTION_VARIABLES,
} from '../../config';
import connection from '../connection';
import {AccessSchema} from './access.schema';
import {EmailVerificationSchema} from './email-verification.schema';
import {EnvironmentSchema} from './environment.schema';
import {ProjectSchema} from './project.schema';
import {TokenSchema} from './token.schema';
import {UserSchema} from './user.schema';
import {VariableSchema} from './variable.schema';

export * from './access.schema';
export * from './email-verification.schema';
export * from './environment.schema';
export * from './project.schema';
export * from './token.schema';
export * from './user.schema';
export * from './variable.schema';

export const userModal = connection.getCollection<UserSchema>(COLLECTION_USERS);

export const emailVerificationModal =
  connection.getCollection<EmailVerificationSchema>(
    COLLECTION_EMAIL_VERIFICATIONS
  );

export const accessModal =
  connection.getCollection<AccessSchema>(COLLECTION_ACCESS);

export const projectModal =
  connection.getCollection<ProjectSchema>(COLLECTION_PROJECTS);

export const environmentModal = connection.getCollection<EnvironmentSchema>(
  COLLECTION_ENVIRONMENTS
);

export const tokenModal =
  connection.getCollection<TokenSchema>(COLLECTION_TOKENS);

export const variableModal =
  connection.getCollection<VariableSchema>(COLLECTION_VARIABLES);
