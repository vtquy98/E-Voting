import InviteMailTemplate from './InviteMailTemplate';
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const replaceMailContent = (template, mapObj) => {
  const re = new RegExp(Object.keys(mapObj).join('|'), 'gi');
  return template.replace(re, matched => mapObj[matched]);
};

export const sendInviteMail = (recipient, { name, password }) => {
  const mapObj = {
    '{{name}}': name,
    '{{password}}': password
  };

  const mailObj = {
    to: recipient,
    subject: '[AGU E-Voting] Invite Using AGU E-voting System',
    html: replaceMailContent(InviteMailTemplate, mapObj),
    from: 'agu@e-voting.tech'
  };

  return sgMail.send(mailObj);
};