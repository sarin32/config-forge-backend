// applevel contstants

export const VERIFICATION_MAX_RESEND_INTERVAL = 30 * 1000; // 30 seconds
export const VERIFICATION_MAX_TRIES = 3;

export const COLLECTION_ACCESS = 'access';
export const COLLECTION_EMAIL_VERIFICATIONS = 'emailVerifications';
export const COLLECTION_ENVIRONMENTS = 'environments';
export const COLLECTION_PROJECTS = 'projects';
export const COLLECTION_TOKENS = 'tokens';
export const COLLECTION_VARIABLES = 'variables';
export const COLLECTION_USERS = 'users';
export const COLLECTION_KEYVAULT = '__keyVault';

export const DATABASE_CONFIG_FORGE = 'configForge';
export const DATABASE_ENCRYPTION = 'encryption';

export const NAMESPACE_KEYVAULT = `${DATABASE_ENCRYPTION}.${COLLECTION_KEYVAULT}`;
export const NAMESPACE_VARIABLES = `${DATABASE_CONFIG_FORGE}.${COLLECTION_VARIABLES}`;

export const DETERMINISTIC_ALGORITHM =
  'AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic';
