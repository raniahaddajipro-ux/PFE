import nodemailer from "nodemailer";

export const sendResetPasswordEmail = async (to, resetLink) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  await transporter.sendMail({
    from: `"Support" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Password reset",
    html: `
      <h2>Password reset</h2>
      <p>Click on the link below:</p>
      <a href="${resetLink}">Reset my password</a>
      <p>This link expires in 15 minutes.</p>
    `,
  });
};
