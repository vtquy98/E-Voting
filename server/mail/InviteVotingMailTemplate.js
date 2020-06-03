import mailLayout from './layout';

const content = `<div class="text" style="padding: 0 3em; text-align: left;">
<h2>Thư mời bỏ phiếu tại AGU E-Voting</h2>
<p>Xin chào {{name}},</p>
<p>{{department}} mời bạn sử dụng hệ thống AGU E-Voting để bỏ phiếu cho ứng cử viên bạn tín nhiệm tại <b> {{electionName}} </b>. Dưới đây là thông tin cuộc bỏ phiếu: </p>

<ul>
  <li>Tên cuộc bỏ phiếu: {{electionName}}</li>
  <li>Mô tả: {{description}} </li>
  <li>Thời gian bỏ phiếu: {{date}}</li>
  <li>Đường dẫn bỏ phiếu: {{linkToVote}} </li>  
</ul>

<p>Bạn có thể tìm thấy cuộc bỏ phiếu này khi bạn truy cập vào bảng điều khiển của mình <a href="e-voting.tech/user/dashboard"> tại đây </a></p>
<p>Trường hợp cần thêm thông tin, đừng ngại ngần gửi mail cho chúng tôi tại <a href="mailto:agu@e-voting.tech">agu@e-voting.tech</a>.</p>
</div>`;

export default mailLayout(content);
