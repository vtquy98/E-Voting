import mailLayout from './layout';

const content = `<div class="text" style="padding: 0 3em; text-align: left;">
<h2>Khôi phục mật khẩu</h2>
<p>Xin chào {{name}},</p>
<p>Vui lòng click vào đường dẫn {{linkToReset}} để khôi phục mật khẩu của bạn.</p>

<p>Trường hợp cần thêm thông tin, đừng ngại ngần gửi mail cho chúng tôi tại <a href="mailto:agu@e-voting.tech">agu@e-voting.tech</a>.</p>
</div>`;

export default mailLayout(content);
