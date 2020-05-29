import mailLayout from './layout';

const content = `<div class="text" style="padding: 0 3em; text-align: left;">
<h2>Result for election: {{electionName}}</h2>
<p>Dear {{name}},</p>
<p> {{department}} Thank you for using E-Voting System to vote for candidate you trust in <b> {{electionName}}. 
<p> Please click <a href="{{resultLink}}"> {{resultLink}} </a> to view result.</p>
<p>In case you need more information, don't hesitate to reach us at <a href="mailto:agu@e-voting.tech">agu@e-voting.tech</a>.</p>
</div>`;

export default mailLayout(content);
