const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(
  process.env.SENDGRID_API_KEY ||
    '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'
);

export default ({ toUserMail, subject, htmlContents }) => {
  const msg = {
    to: toUserMail,
    from: 'agu@e-voting.tech',
    subject: `[AGU E-Voting] ${subject}`,
    html: htmlContents
  };
  sgMail.send(msg);
};
