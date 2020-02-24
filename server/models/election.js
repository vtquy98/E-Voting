import { model, Types, Schema } from 'mongoose';
import uuid from 'uuid';
import { DRAFT } from '../enums/electionState';
import { SELECT_TO_VOTE } from '../enums/votingType';
import { updateDocBuilder } from './utils';

const ElectionSchema = Schema({
  _id: {
    type: Schema.ObjectId,
    default: Types.ObjectId
  },
  id: {
    type: String,
    default: uuid,
    required: true
  },
  name: { type: String, required: true },
  election_address: { type: String, required: true },
  created_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  updated_at: {
    type: Date,
    default: Date.now,
    required: true
  },
  description: {
    type: String
  },
  state: {
    type: Number,
    default: DRAFT,
    required: true
  },
  voting_type: {
    type: Number,
    default: SELECT_TO_VOTE,
    required: true
  },
  election_owner: { type: String, required: true, default: 'AGU' },
  voting_time: { type: Number, requiered: true, default: 10 },
  at_least_vote: Number,
  most_vote: Number
});

ElectionSchema.methods.updateDoc = updateDocBuilder();

const Elections = model('Elections', ElectionSchema);

module.exports = Elections;
