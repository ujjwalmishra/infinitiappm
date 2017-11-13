import Joi from 'joi';

export default {
  // POST /api/users
  createUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    }
  },

  // UPDATE /api/users/:userId
  updateUser: {
    body: {
      username: Joi.string().required(),
      mobileNumber: Joi.string().regex(/^[1-9][0-9]{9}$/).required()
    },
    params: {
      userId: Joi.string().hex().required()
    }
  },

  // POST /api/auth/login
  login: {
    body: {
      publicKey: Joi.string().required(),
      signedPublicKey: Joi.string().required()
    }
  },

  transactions: {
    body : {
      publicKey: Joi.string().required(),
      signedPublicKey: Joi.string().required(),
      assetId: Joi.string().required()      
    }
  }
};
