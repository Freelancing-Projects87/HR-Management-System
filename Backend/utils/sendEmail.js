const nodemailer = require("nodemailer");

const sendEmail = async (subject, message, send_to, sent_from, reply_to) => {
  ///create email transporter/////
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: 465,
    secure: true,
    auth: {
      user: "ameersoftdev@gmail.com",
      //  process.env.EMAIL_USER
      pass: "bkgkdfufaivnwspw",
      //  process.env.EMAIL_PASSWORD
    },
    tls: {
      rejectUnauthorized: false,
    },
  });

  ///options object for sending an email////
  const options = {
    from: sent_from,
    to: send_to,
    reply: reply_to,
    subject: subject,
    html: message,
  };

  ////send email///
  transporter.sendMail(options, (err, info) => {
    if (err) {
      console.log("ERROR IN SENDING AN EMAIL: ", err);
    } else {
      console.log("EMAIL SENT Successfully: ", info);
    }
  });
};

module.exports = sendEmail;
