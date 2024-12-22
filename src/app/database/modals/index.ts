import { UserSchema } from './user.modal.interface';
import {
  COLLECTION_EMAIL_VERIFICATIONS,
  COLLECTION_ENVIRONMENTS,
  COLLECTION_PROJECTS,
  COLLECTION_ROLES,
  COLLECTION_TOKENS,
  COLLECTION_USERS,
  COLLECTION_VARIABLES,
} from '../../config';
import connection from '../connection';

import { EmailVerificationSchema } from './email-verification.modal.interface';
import { ProjectSchema } from './project.modal.interface';
import { EnvironmentSchema } from './environment.modal.interface';
import { TokenSchema } from './token.modal.interface';
import { VariableSchema } from './variable.modal.interface';
import { RolesSchema } from './roles.modal.interface';

export const userModal = connection.getCollection<UserSchema>(COLLECTION_USERS);

export const emailVerificationModal =
  connection.getCollection<EmailVerificationSchema>(
    COLLECTION_EMAIL_VERIFICATIONS
  );

export const projectModal =
  connection.getCollection<ProjectSchema>(COLLECTION_PROJECTS);

export const environmentModal = connection.getCollection<EnvironmentSchema>(
  COLLECTION_ENVIRONMENTS
);

export const tokenModal =
  connection.getCollection<TokenSchema>(COLLECTION_TOKENS);

export const variableModal =
  connection.getCollection<VariableSchema>(COLLECTION_VARIABLES);

export const roleModal =
  connection.getCollection<RolesSchema>(COLLECTION_ROLES);
