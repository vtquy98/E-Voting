import InviteMailTemplate from './InviteMailTemplate';
import GrettingMailTemplate from './GrettingMailTemplate';
import InviteVotingMailTemplate from './InviteVotingMailTemplate';

const mailgun = require('mailgun-js');
const MAIL_GUN_KEY = process.env.MAIL_GUN_KEY || 'here-is-key';
const MAIL_GUN_DOMAIN = process.env.MAIL_GUN_DOMAIN || 'contact.e-voting.tech';

const mg = mailgun({
  apiKey: MAIL_GUN_KEY,
  domain: MAIL_GUN_DOMAIN
});

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

  return mg.messages().send(mailObj);
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

  return mg.messages().send(mailObj);
};

export const sendInviteVotingMail = (
  recipient,
  { name, department, electionName, date, linkToVote, description }
) => {
  const mapObj = {
    '{{name}}': name,
    '{{department}}': department,
    '{{electionName}}': electionName,
    '{{date}}': date,
    '{{linkToVote}}': linkToVote,
    '{{description}}': description
  };

  const mailObj = {
    to: recipient,
    subject: 'Invite Voting Letter',
    html: replaceMailContent(InviteVotingMailTemplate, mapObj),
    from: 'agu@e-voting.tech'
  };

  return mg.messages().send(mailObj);
};
