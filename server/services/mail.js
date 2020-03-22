const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export default ({ toUserMail, subject, htmlContents }) => {
  const msg = {
    to: toUserMail,
    from: 'agu@e-voting.tech',
    subject: `[AGU E-Voting] ${subject}`,
    html: htmlContents
  };
  sgMail.send(msg);
};
