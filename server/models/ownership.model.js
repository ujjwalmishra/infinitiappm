import Promise from 'bluebird';
import mongoose from 'mongoose';
import httpStatus from 'http-status';
import APIError from '../helpers/APIError';

/**
 * Owner Schema
 */
const OwnerSchema = new mongoose.Schema({
  publikKey: {
    type: String,
    required: true
  },
  assetId: {
    type: String,
    required: true
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
OwnerSchema.method({
});

/**
 * Statics
 */
OwnerSchema.statics = {
  /**
   * Get owners
   * @param {ObjectId} id - The objectId of user.
   * @returns {Promise<User, APIError>}
   */
  findByAssetId(id) {
    return this.find({assetId : id})
      .exec()
      .then((ownership) => {
        if (ownership) {
          return ownership;
        }
        const err = new APIError('No ownership for assetId exists!', httpStatus.NOT_FOUND);
        return Promise.reject(err);
      });
  }

};

/**
 * @typedef User
 */
export default mongoose.model('Ownership', OwnerSchema);
