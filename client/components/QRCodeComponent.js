import { withState } from 'recompose';
import React from 'react';

import { generateQrcode } from '../libs/generateQRCode';
// import CopyTextComponent from './CopyTextComponent';

const WithQrCodeState = withState('qrcode', 'setQrcode', '');

class QrCodeComponent extends React.Component {
  async componentWillMount() {
    const { text, setQrcode, size } = this.props;
    const qrcode = await generateQrcode(text, { width: size, height: size });

    setQrcode(qrcode);
  }
  render() {
    const { qrcode, text } = this.props;

    return qrcode ? (
      <React.Fragment>
        <div className="qrcode">
          <img className="img-container" alt="" src={qrcode} />
        </div>
        <h3 className="text">{text}</h3>
        <style jsx>{`
          .qrcode {
            display: flex;
            margin-bottom: 12px;
            justify-content: center;
          }
          .text {
            width: 100%;
          }
        `}</style>
      </React.Fragment>
    ) : (
      <span> cannot generate QRCode</span>
    );
  }
}

export default WithQrCodeState(QrCodeComponent);
