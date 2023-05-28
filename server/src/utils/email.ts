import nodemailer, { SendMailOptions } from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  host: "smtp.gmail.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.EMAIL_USERNAME as string,
    pass: process.env.EMAIL_PASSWORD as string,
  },
});

export const sendEmail = async (data: { email: string; otp: string }) => {
  try {
    const mailOptions: SendMailOptions = {
      from: process.env.EMAIL_USERNAME as string,
      to: data.email,
      subject: "Verify Account: Todo Web App",
      html: `<p>OTP:<b>${data.otp}</b></p>`,
    };
    await transporter.sendMail(mailOptions);
    console.info("Email sent successfully");
  } catch (e: unknown) {
    throw e;
  }
};
