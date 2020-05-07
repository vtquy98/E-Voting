import { model, Schema } from 'mongoose';

const voteSchema = Schema({
  election_id: { type: String, required: true },
  voter_id: { type: String, required: true },
  candidate_id: { type: String, required: true },
  is_voted: { type: Boolean, required: true, default: false },
  transaction_hash: {
    type: String,
    required: true
  }
});

const Votes = model('Votes', voteSchema);

module.exports = Votes;
