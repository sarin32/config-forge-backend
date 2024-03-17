import {ObjectId} from 'mongodb';
import {
  VERIFICATION_MAX_RESEND_INTERVAL,
  VERIFICATION_MAX_TRIES,
} from '../config';
import {emailVerificationRepository, userRepository} from '../database';
import {AuthorizationError, ConflictError, ForbiddenError} from '../errors';
import emailUtil from '../utils/email-util';
import {generateRandomString} from '../utils/string-util';
import {generateTemplate} from '../utils/template-util';
import { userService } from './user.service';

class EmailVerificationService {
  private readonly repository = emailVerificationRepository;

  public async sendEmailForVerification({userId}: {userId: string}) {
    const user = await userService.getUserInfo({userId})

    const existingVerification =
      await this.repository.getEmailVerification({
        userId: user._id,
      });

    if (existingVerification) {
      const timeSinceLastSend =
        Date.now() - existingVerification.lastSendTime.getTime();

      if (timeSinceLastSend < VERIFICATION_MAX_RESEND_INTERVAL) {
        throw new ForbiddenError(
          'Resend request is not allowed within 1 minute of the previous request'
        );
      }

      if (existingVerification.verificationTry >= VERIFICATION_MAX_TRIES) {
        throw new ForbiddenError(
          'Email verification tries have been exhausted'
        );
      }

      await this.repository.updateVerificationById({
        id: existingVerification._id,
        incrementVerificationTry: true,
      });

      await this.sendEmailVerificationEmail({
        emailId: user.email,
        otp: existingVerification.otp,
      });
    } else {
      const otp = generateRandomString(6, {includeNumbers: true});

      await this.repository.createEmailVerification({
        email: user.email,
        otp,
        userId: user._id,
      });

      await this.sendEmailVerificationEmail({
        emailId: user.email,
        otp,
      });
    }
  }

  async verifyEmailVerificationOTP({
    otp,
    userId,
  }: {
    otp: string;
    userId: string | ObjectId;
  }) {
    const verification =
      await this.repository.getEmailVerification({
        userId: new ObjectId(userId),
      });

    if (!verification)
      throw new ConflictError('No verification process has been initiated');

    if (verification.otp !== otp) throw new AuthorizationError('Invalid OTP');

    await userService.markUserAsVerified({userId: new ObjectId(userId)});

    return {message: 'User email verified successfully'};
  }

  private async sendEmailVerificationEmail({
    otp,
    emailId,
  }: {
    otp: string;
    emailId: string;
  }) {
    const body = await generateTemplate('email-verification', {otp});
    await emailUtil.sendEmail({
      to: emailId,
      subject: 'OTP for your email verification',
      html: body,
      senderName: 'IntelliExam Admin',
    });
  }
}

export const emailVerificationService = new EmailVerificationService();
