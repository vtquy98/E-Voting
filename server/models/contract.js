import { model, Schema } from 'mongoose';

const contractSchema = Schema({
  contract_address: { type: String, required: true }
});

const Contracts = model('Contracts', contractSchema);

module.exports = Contracts;
