import {UserSchema} from '@i/database/modals/user.modal.interface';
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

import {EmailVerificationSchema} from '@i/database/modals/email-verification.modal.interface';
import {ProjectSchema} from '@i/database/modals/project.modal.interface';
import {EnvironmentSchema} from '@i/database/modals/environment.modal.interface';
import {TokenSchema} from '@i/database/modals/token.modal.interface';
import {VariableSchema} from '@i/database/modals/variable.modal.interface';
import {RolesSchema} from '@i/database/modals/roles.modal.interface';

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
