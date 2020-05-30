import mailLayout from './layout';

const content = `<div class="text" style="padding: 0 3em; text-align: left;">
<h2>Thư mời sử dụng hệ thống AGU E-Voting</h2>
<p>Xin chào {{name}},</p>
<p>Chúng tôi mời bạn sử dụng hệ thống bỏ phiếu điện tử AGU E-Voting để bỏ phiếu cho các ứng viên mà bạn tín nhiệm trong các cuộc bỏ phiếu sắp tới. Dưới đây là thông tin tài khoản để bạn đăng nhập: </p>
<p>Tên đăng nhập: <b>{{name}}</b></p>
<p>Mật khẩu: <b>{{password}}</b></p>
<p>Bạn có thể đăng nhập<a href="e-voting.tech/login"> tại đây </a>.
<p>Vui lòng thay đổi mật khẩu vào lần đăng nhập tới.</p>
<p>Cách khác, bạn có thể sử dụng <b>tài khoản google này</b> để đăng nhập.</p>

<p>Trường hợp cần thêm thông tin, đừng ngại ngần gửi mail cho chúng tôi tại <a href="mailto:agu@e-voting.tech">agu@e-voting.tech</a>.</p>
</div>`;

export default mailLayout(content);
