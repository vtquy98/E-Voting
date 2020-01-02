/**
 * Example to refresh tokens using https://github.com/auth0/node-jsonwebtoken
 * It was requested to be introduced at as part of the jsonwebtoken library,
 * since we feel it does not add too much value but it will add code to mantain
 * we won't include it.
 *
 * I create this gist just to help those who want to auto-refresh JWTs.
 */

import { sign, verify } from 'jsonwebtoken';
import { pick } from 'lodash/fp';
import jwt from 'jsonwebtoken';

function TokenGenerator(secretOrPrivateKey, secretOrPublicKey, options) {
  this.secretOrPrivateKey = process.env.JWT_SECRET || 'jwt-secret';
  this.secretOrPublicKey = process.env.JWT_PUBLIC || 'jwt-public';
  this.options = options || {
    expiresIn: 604800 // 1 week
  }; //algorithm + keyid + noTimestamp + expiresIn + notBefore
}

TokenGenerator.prototype.sign = function(payload, signOptions) {
  const info = pick(['id', 'googleId', 'email'])(payload);

  const options = { ...this.options, ...signOptions };
  // if payload is found and password is right create a token
  return sign(info, this.secretOrPrivateKey, options);
};

// refreshOptions.verify = options you would use with verify function
// refreshOptions.jwtid = contains the id for the new token
TokenGenerator.prototype.refresh = function(token, refreshOptions) {
  const payload = verify(token, this.secretOrPublicKey, refreshOptions.verify);
  delete payload.iat;
  delete payload.exp;
  delete payload.nbf;
  delete payload.jti; //We are generating a new token, if you are using jwtid during signing, pass it in refreshOptions
  const jwtSignOptions = Object.assign({}, this.options, {
    jwtid: refreshOptions.jwtid
  });
  // The first signing converted all needed options into claims, they are already in the payload
  return sign(payload, this.secretOrPrivateKey, jwtSignOptions);
};

TokenGenerator.prototype.verify = async function(token, verifyOptions = {}) {
  try {
    if (!token) {
      return null;
    }

    const options = ({}, this.verifyOptions, verifyOptions);

    const payload = await jwt.verify(token, this.secretOrPrivateKey, options);

    return payload;
  } catch (error) {
    console.log(error.message);
    throw error;
  }
};

module.exports = new TokenGenerator();
