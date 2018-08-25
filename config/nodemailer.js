const nodemailer = require('nodemailer');
const config = require('./emailcred');

module.exports.nodeMailer = function (email, subject, msg) {
  let transporter = nodemailer.createTransport({
    service: 'gmail',
    secure: false,
    port: 25,
    auth: {
      user: config.email,
      pass: config.password
    },
    tls: {
      rejectUnauthorized: false
    }
  });

  let mailOptions = {
    from: '"ProjectZeros" <TestPZs99@gmail.com',
    to: email,
    subject: subject, // Subject line
    text: 'Hello', // plain text body
    html: msg // html body
  };

  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      return console.log(error);
    }
  });
}