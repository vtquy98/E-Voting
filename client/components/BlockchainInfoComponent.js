import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { compose } from 'recompose';
import { createStructuredSelector } from 'reselect';
import { withTranslation } from '../i18n';
import { copyToClipboard } from '../utils';
import {
  getBlockchainData,
  getBlockchainDataDataSelector
} from '../stores/ElectionState';
import { toast } from 'react-toastify';
const connectToRedux = connect(
  createStructuredSelector({
    blockchainData: getBlockchainDataDataSelector
  }),
  dispatch => ({
    getBlockchainData: () => {
      dispatch(getBlockchainData());
    }
  })
);

const enhance = compose(
  withTranslation('admin-dashboard'),
  connectToRedux
);

const ENV_DEPLOY = process.env.ENV_DEPLOY || 'ropsten';

class BlockchainInfoComponent extends React.Component {
  componentDidMount() {
    this.props.getBlockchainData();
  }

  render() {
    const { blockchainData, t } = this.props;
    return (
      <React.Fragment>
        <div className="card shadow mb-4 border-none">
          <div className="card-header py-3">
            <h6 className="m-0 font-weight-bold text-primary">
              {t('blockchainInfo.title')}
            </h6>
          </div>
          <div className="card-body">
            <div className="row">
              <div className="col-sm">
                {blockchainData && (
                  <Fragment>
                    <div className="row">
                      <div className="col-sm-6 mb-2">
                        <a
                          href="#"
                          style={{ textDecoration: 'none' }}
                          onClick={() => {
                            copyToClipboard(blockchainData.adminWallet);
                            toast.success(t('blockchainInfo.coppyToastMsg'));
                          }}
                        >
                          <div className="card border-none bg-primary text-white shadow">
                            <div className="card-body">
                              {t('blockchainInfo.yourEthereumWallet')}
                              <div className="text-white-50 small text-truncate">
                                {blockchainData.adminWallet}
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                      <div className="col-sm-6 mb-2">
                        <div className="card border-none bg-primary text-white shadow">
                          <div className="card-body">
                            {t('blockchainInfo.yourBalance')}
                            <div className="text-white-50 small">
                              {' '}
                              {blockchainData.balance}
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-sm-12 mb-2">
                        <a
                          href={`${
                            ENV_DEPLOY === 'ropsten'
                              ? 'https://ropsten.etherscan.io/address/' +
                                blockchainData.contractAddress
                              : 'https://etherscan.io/address/' +
                                blockchainData.contractAddress
                          }`}
                          rel="noopener noreferrer"
                          target="_blank"
                          style={{ textDecoration: 'none' }}
                        >
                          <div className="card border-none bg-primary text-white shadow">
                            <div className="card-body">
                              {t('blockchainInfo.smartContractAddress')}
                              <div className="text-white-50 small">
                                {blockchainData.contractAddress}
                              </div>
                            </div>
                          </div>
                        </a>
                      </div>
                    </div>
                  </Fragment>
                )}
                <div className="col-sm-12 mt-2">
                  <p>{t('blockchainInfo.textHelper1')}</p>
                  <p>{t('blockchainInfo.textHelper2')}</p>
                </div>
              </div>

              <div className="col-sm d-flex align-items-stretch">
                <div className="d-flex align-items-center">
                  <img
                    className="img-fluid px-3 px-sm-4 mt-3 mb-4"
                    src="/static/assets/images/blockchain.svg"
                    alt="instruction-img"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

export default enhance(BlockchainInfoComponent);
