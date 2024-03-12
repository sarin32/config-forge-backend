import {ObjectId} from 'mongodb';
import {EmailVerificationSchema} from '@i/database/modals/email-verification.modal.interface';

export interface CreateEmailVerificationParams {
  userId: ObjectId;
  otp: string;
  email: string;
}

export interface GetEmailVerificationParams {
  userId: ObjectId;
}

export interface UpdateVerificationByIdParams {
  id: ObjectId;
  incrementVerificationTry: boolean;
  otp?: string;
}

export interface EmailVerificationRepositoryInterface {
  createEmailVerification(
    params: CreateEmailVerificationParams
  ): Promise<{id: ObjectId}>;

  getEmailVerification(
    params: GetEmailVerificationParams
  ): Promise<EmailVerificationSchema | null>;

  updateVerificationById(params: UpdateVerificationByIdParams): Promise<void>;
}
