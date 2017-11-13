import jwt from 'jsonwebtoken';
import httpStatus from 'http-status';
import nacl from 'tweetnacl';
import APIError from '../helpers/APIError';
import config from '../../config/config';
import User from '../models/user.model';

// sample user, used for authentication
const user = {
  username: 'react',
  password: 'express'
};

/**
 * Returns jwt token if valid username and password is provided
 * @param req
 * @param res
 * @param next
 * @returns {*}
 */
function login(req, res, next) {
  // Ideally you'll fetch this from the db
  // Idea here was to show how jwt works with simplicity
  console.log("-------------------------------------------------------------------");
  console.log(req.body);

  User.findOne({ publicKey : req.body.publicKey }, function (err, user) {
    if (err) return handleError(err);
    
    const pubKey = nacl.sign.open(req.body.signedPublicKey, req.body.publicKey); //decrypt the message

    if(pubKey == req.body.publicKey) {
      
      const token = jwt.sign({ publicKey: user.publicKey }, config.jwtSecret);
    
      return res.json({ token, publicKey: user.publicKey });     
    }


  });

  const err = new APIError('Authentication error', httpStatus.UNAUTHORIZED, true);
  
  return next(err);
}

/**
 * This is a protected route. Will return random number only if jwt token is provided in header.
 * @param req
 * @param res
 * @returns {*}
 */
function getRandomNumber(req, res) {
  // req.user is assigned by jwt middleware if valid token is provided
  return res.json({
    user: req.user,
    num: Math.random() * 100
  });
}

export default { login, getRandomNumber };
