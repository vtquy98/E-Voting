import mailLayout from './layout';

const content = `<div class="text" style="padding: 0 3em; text-align: left;">
<h2>Invite To Voting At AGU E-Voting</h2>
<p>Dear {{name}},</p>
<p> {{department}} Invite you using E-Voting System to vote for candidate you trust in <b> {{electionName}} </b>. Here is some infomation for this election: </p>

<ul>
  <li>Election Name: {{electionName}}</li>
  <li>Description: {{description}} </li>
  <li>Date: {{date}}</li>
  <li>Link to vote: {{linkToVote}} </li>  
</ul>

<p>In case you need more information, don't hesitate to reach us at <a href="mailto:agu@e-voting.tech">agu@e-voting.tech</a>.</p>
</div>`;

export default mailLayout(content);
