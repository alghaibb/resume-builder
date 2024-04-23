import { database } from "@/lib/database";

export const getForgotPasswordTokenByEmail = async (email: string) => {
  try {
    const forgotPasswordToken = await database.passwordResetToken.findFirst({
      where: {
        email: email
      }
    })

    return forgotPasswordToken;
  } catch (error) {
    console.log(error);
  }
}

export const getForgotPasswordTokenByToken = async (token: string) => {
  try {
    const forgotPasswordToken = await database.passwordResetToken.findFirst({
      where: {
        token: token
      }
    })

    return forgotPasswordToken;
  } catch (error) {
    console.log(error);
  }

}