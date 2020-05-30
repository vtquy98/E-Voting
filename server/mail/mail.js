import InviteMailTemplate from './InviteMailTemplate';
import GrettingMailTemplate from './GrettingMailTemplate';
import InviteVotingMailTemplate from './InviteVotingMailTemplate';
import ForgotPasswordTemplate from './ForgotPasswordTemplate';
import ElectionResultMailTemplate from './ElectionResultMailTemplate';

require('dotenv').config({
  path: './.env'
});

const mailgun = require('mailgun-js');
const MAIL_GUN_KEY = process.env.MAIL_GUN_KEY;
const MAIL_GUN_DOMAIN = process.env.MAIL_GUN_DOMAIN;

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
    subject: 'Thư mời sử dụng hệ thống bỏ phiếu điện tử AGU E-Voting',
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
    subject: 'Chào mừng đến với AGU E-Voting!',
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
    subject: 'Thư mời bỏ phiếu tại AGU E-Voting',
    html: replaceMailContent(InviteVotingMailTemplate, mapObj),
    from: 'agu@e-voting.tech'
  };

  return mg.messages().send(mailObj);
};

export const sendForgotPasswordMail = (recipient, { name, linkToReset }) => {
  const mapObj = {
    '{{name}}': name,
    '{{linkToReset}}': linkToReset
  };

  const mailObj = {
    to: recipient,
    subject: 'Khôi Phục mật khẩu tại AGU E-Voting!',
    html: replaceMailContent(ForgotPasswordTemplate, mapObj),
    from: 'agu@e-voting.tech'
  };

  return mg.messages().send(mailObj);
};

export const sendElectionResultMail = (
  recipient,
  { electionName, name, department, resultLink }
) => {
  const mapObj = {
    '{{name}}': name,
    '{{department}}': department,
    '{{electionName}}': electionName,
    '{{resultLink}}': resultLink
  };

  const mailObj = {
    to: recipient,
    subject: `Kết quả bỏ phiếu của ${electionName}!`,
    html: replaceMailContent(ElectionResultMailTemplate, mapObj),
    from: 'agu@e-voting.tech'
  };

  return mg.messages().send(mailObj);
};
