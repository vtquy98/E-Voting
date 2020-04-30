import mailLayout from './layout';

const content = `<div class="text" style="padding: 0 3em; text-align: left;">
<h2>Reset your password</h2>
<p>Dear {{name}},</p>
<p>Please click {{linkToReset}} to reset your password.</p>

<p>In case you need more information, don't hesitate to reach us at <a href="mailto:agu@e-voting.tech">agu@e-voting.tech</a>.</p>
</div>`;

export default mailLayout(content);
