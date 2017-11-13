import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * User Schema
 */
const UserSchema = new mongoose.Schema({
  publicKey: {
    type: String,
    required: true,
    index: { unique: true } 
  },
  merchantName : {
    type: String,
    required: true
  },
  address: {
    type: String
  },
  mobileNumber: {
    type: String,
    match: [/^[1-9][0-9]{9}$/, 'The value of path {PATH} ({VALUE}) is not a valid mobile number.']
  },
  emailId: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

/**
 * Add your
 * - pre-save hooks
 * - validations
 * - virtuals
 */

/**
 * Methods
 */
UserSchema.method({
});

/**
 * Statics
 */
UserSchema.statics = {
  /**
   * Get user
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  findMerchantKey(key) {
    return this.find({publicKey : key})
      .exec()
      .then((merchant) => {
        if (merchant) {
          return merchant;
        }
        const err = new APIError('No Mercahnt for id exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }

  
};

/**
 * @typedef User
 */
export default mongoose.model('User', UserSchema);
