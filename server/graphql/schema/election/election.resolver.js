import { path } from 'lodash/fp';

module.exports = {
  Election: {
    contractAddress: path('contract_address'),
    createdAt: path('created_at'),
    updatedAt: path('updated_at')
  }
};
