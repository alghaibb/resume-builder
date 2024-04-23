import { getVerificationTokenByEmail } from '@/auth-data/verification-token';
import { getForgotPasswordTokenByEmail } from '@/auth-data/forgot-password-token';
import { v4 as uuidv4 } from 'uuid';
import { database } from './database';

export const generateVerificationToken = async (email: string) => {
  // Generate a random token 
  const token = uuidv4();
  const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 hours

  // Check if a token already exists for the user
  const existingToken = await getVerificationTokenByEmail(email)

  if (existingToken) {
    await database.verificationToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  // Create a new verification token
  const verificationToken = await database.verificationToken.create({
    data: {
      email,
      token,
      expiresAt: new Date(expires)
    }
  })

  return verificationToken;
}

export const generateForgotPasswordToken = async (email: string) => {
  // Generate a random token 
  const token = uuidv4();
  const expires = new Date().getTime() + 1000 * 60 * 60 * 1; // 1 hours

  // Check if a token already exists for the user
  const existingToken = await getForgotPasswordTokenByEmail(email)

  if (existingToken) {
    await database.passwordResetToken.delete({
      where: {
        id: existingToken.id
      }
    })
  }

  // Create a new verification token
  const forgotPasswordToken = await database.passwordResetToken.create({
    data: {
      email,
      token,
      createdAt: new Date(),
      expiresAt: new Date(expires),
    }
  })

  return forgotPasswordToken;
}