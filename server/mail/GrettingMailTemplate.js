import mailLayout from './layout';

const content = `<div class="text" style="padding: 0 3em; text-align: left;">
<h2>Chào mừng đến với AGU E-Voting</h2>
<p>Xin chào {{name}},</p>
<p>Cảm ơn bạn đã sử dụng hệ thống AGU E-Voting để bỏ phiếu cho các ứng cử viên mà bạn tín nhiêm trong các cuộc bỏ phiếu sắp tới. Dưới đây là thông tin tài khoản để bạn đăng nhập:</p>
<p>Tên đăng nhập: <b>{{name}}</b></p>
<p>Mật khẩu: <b>{{password}}</b></p>
<p>Vui lòng thay đổi mật khẩu vào lần đăng nhập tới.</p>
<p>Cách khác, bạn có thể sử dụng <b>tài khoản google</b> để đăng nhập.</p>

<p>Trường hợp cần thêm thông tin, đừng ngại ngần gửi mail cho chúng tôi tại <a href="mailto:agu@e-voting.tech">agu@e-voting.tech</a>.</p>
</div>`;

export default mailLayout(content);
