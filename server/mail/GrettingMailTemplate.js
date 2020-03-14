import mailLayout from './layout';

const content = `<div class="text" style="padding: 0 3em; text-align: left;">
<h2>Welcome To AGU E-Voting system</h2>
<p>Dear {{name}},</p>
<p>Thank you for using our E-Voting System to vote for candidate you like in some next voting. Here is your infomation to login: </p>
<p>Username: <b>{{name}}</b></p>
<p>Default password: <b>{{password}}</b></p>
<p>Please remind that change your password in the next login.</p>
<p>By the way, you also using your <b>Google account</b> to using system.</p>

<p>In case you need more information, don't hesitate to reach us at <a href="mailto:agu@e-voting.tech">agu@e-voting.tech</a>.</p>
</div>`;

export default mailLayout(content);
