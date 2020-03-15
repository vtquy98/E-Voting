import InviteMailTemplate from './InviteMailTemplate';
import GrettingMailTemplate from './GrettingMailTemplate';
import InviteVotingMailTemplate from './InviteVotingMailTemplate';

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

export const sendGrettingMail = (recipient, { name, password }) => {
  const mapObj = {
    '{{name}}': name,
    '{{password}}': password
  };

  const mailObj = {
    to: recipient,
    subject: 'Welcome To AGU E-voting System!',
    html: replaceMailContent(GrettingMailTemplate, mapObj),
    from: 'agu@e-voting.tech'
  };

  return sgMail.send(mailObj);
};

export const sendInviteVotingMail = (
  recipient,
  { name, department, electionName, date }
) => {
  const mapObj = {
    '{{name}}': name,
    '{{department}}': department,
    '{{electionName}}': electionName,
    '{{date}}': date
  };

  const mailObj = {
    to: recipient,
    subject: 'Invite Voting Letter',
    html: replaceMailContent(InviteVotingMailTemplate, mapObj),
    from: 'agu@e-voting.tech'
  };

  return sgMail.send(mailObj);
};
