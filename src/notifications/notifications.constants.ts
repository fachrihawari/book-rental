import { MailerOptions } from "@nestjs-modules/mailer";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";

export const mailerConstants: MailerOptions = {
  transport: process.env.SMTP_URL,
  defaults: {
    from: {
      name: "Book Rental",
      address: "book_rental@hawari.dev"
    }
  },
  template: {
    dir: __dirname + '/templates',
    adapter: new HandlebarsAdapter(),
    options: {
      strict: true,
    },
  },
}

export const notificationsQueue = {
  name: 'notificationsQueue',
  jobNames: {
    sendOtpEmail: 'sendOtpEmail'
  }
}

