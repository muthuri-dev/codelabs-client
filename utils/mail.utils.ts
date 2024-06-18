import nodemailer from "nodemailer";
import Mail from "nodemailer/lib/mailer";
import SMTPTransport from "nodemailer/lib/smtp-transport";

const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  secure: process.env.NODE_ENV !== "development",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
} as SMTPTransport.Options);

type TEmailDto = {
  sender: Mail.Address;
  receipient: Mail.Address;
  message: string;
};

// export const sendEmail = async (emailDto: TEmailDto) => {
//   const { message, receipient, sender } = emailDto;

//   return await transport.sendMail({
//     from: sender,
//     to: receipient,
//     text: message,
//   });
// };

export const sendEmail = async (values: { email: string; message: string }) =>
  fetch("/api/email", {
    method: "POST",
    body: JSON.stringify(values),
    headers: { "Content-Type": "application/json", Accept: "application/json" },
  });

export const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASSWORD,
  },
});
