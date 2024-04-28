import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendVerificationEmail = async (email: string, token: string) => {
  const confirmationLink = `${process.env.NEXT_PUBLIC_URL}/verify-email?token=${token}`;
  const emailHtml = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Verify Your Email</title>
    </head>
    <body style="margin: 0; padding: 0; background-color: #f7f7f7; font-family: Arial, sans-serif;">
      <table border="0" cellpadding="0" cellspacing="0" width="100%">
        <tr>
          <td align="center">
            <table border="0" cellpadding="0" cellspacing="0" width="600" style="background-color: #ffffff; padding: 40px;">
              <tr>
                <td align="center" style="padding: 20px;">
                  <p style="font-size: 18px; color: #333333;">Please confirm that you want to use this email address for your account.</p>
                  <a href="${confirmationLink}" style="background-color: #3498db; color: #ffffff; padding: 15px 25px; text-decoration: none; border-radius: 50px; font-weight: bold; display: inline-block; margin-top: 20px;">Verify Account</a>
                </td>
              </tr>
            </table>
          </td>
        </tr>
      </table>
    </body>
    </html>
  `;

  await resend.emails.send({
    from: "noreply@codingwithmj.com",
    to: email,
    subject: "Verify Your Email",
    html: emailHtml
  });
};
