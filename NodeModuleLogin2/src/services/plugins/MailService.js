const nodemailer = require("nodemailer");

class MailService {
  sendMail(content, subject, toEmail) {
    return new Promise((resolve, reject) => {
      let transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASSWORD,
        },
      });

      let mainOptions = {
        from: "NQH-Test nodemailer",
        to: toEmail,
        subject: subject,
        html: content,
      };

      transporter.sendMail(mainOptions, function (err, info) {
        if (err) {
          // reject(err);
          throw new Error("notSendMail");
        } else {
          resolve(true);
        }
      });
    });
  }
}

module.exports = new MailService();
