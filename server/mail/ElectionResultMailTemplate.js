import mailLayout from './layout';

const content = `<div class="text" style="padding: 0 3em; text-align: left;">
<h2>Kết quả cuộc bỏ phiếu: {{electionName}}</h2>
<p>Xin chào {{name}},</p>
<p> {{department}} cảm ơn bạn đã sử dụng hệ thống AGU E-Voting để bỏ phiếu cho ứng cử viên mà bạn tín nhiệm trong cuộc bỏ phiếu <b> {{electionName}}. 
<p> Vui lòng click vào đường dẫn <a href="{{resultLink}}"> {{resultLink}} </a> để xem kết quả.</p>
<p>Trường hợp cần thêm thông tin, đừng ngại ngần gửi mail cho chúng tôi tại <a href="mailto:agu@e-voting.tech">agu@e-voting.tech</a>.</p>
</div>`;

// const content = `<div class="text" style="padding: 0 3em; text-align: left;">
// <h2>Result for election: {{electionName}}</h2>
// <p>Dear {{name}},</p>
// <p> {{department}} Thank you for using E-Voting System to vote for candidate you trust in <b> {{electionName}}.
// <p> Please click <a href="{{resultLink}}"> {{resultLink}} </a> to view result.</p>
// <p>In case you need more information, don't hesitate to reach us at <a href="mailto:agu@e-voting.tech">agu@e-voting.tech</a>.</p>
// </div>`;

export default mailLayout(content);
