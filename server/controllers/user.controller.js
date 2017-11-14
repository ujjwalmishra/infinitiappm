import User from '../models/user.model';
import Ownership from '../models/ownership.model';
import bdb from '../bdb';

/**
 * Load user and append to req.
 */
function load(req, res, next, id) {
  User.findOne({publicKey : id})
    .then((user) => {
      req.user = user; // eslint-disable-line no-param-reassign
      return next();
    })
    .catch(e => next(e));
}

/**
 * Get user
 * @returns {User}
 */
function get(req, res) {
  return res.json(req.user);
}

/**
 * Create new user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function create(req, res, next) {
  const user = new User({
    username: req.body.username,
    mobileNumber: req.body.mobileNumber
  });

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Update existing user
 * @property {string} req.body.username - The username of user.
 * @property {string} req.body.mobileNumber - The mobileNumber of user.
 * @returns {User}
 */
function update(req, res, next) {
  const user = req.user;
  user.username = req.body.username;
  user.mobileNumber = req.body.mobileNumber;

  user.save()
    .then(savedUser => res.json(savedUser))
    .catch(e => next(e));
}

/**
 * Get user list.
 * @property {number} req.query.skip - Number of users to be skipped.
 * @property {number} req.query.limit - Limit number of users to be returned.
 * @returns {User[]}
 */
function list(req, res, next) {
  const { limit = 50, skip = 0 } = req.query;
  User.list({ limit, skip })
    .then(users => res.json(users))
    .catch(e => next(e));
}

/**
 * Delete user.
 * @returns {User}
 */
function remove(req, res, next) {
  const user = req.user;
  user.remove()
    .then(deletedUser => res.json(deletedUser))
    .catch(e => next(e));
}

/**
 * Get all owned assets.
 * @return all assets
 */
function getMyAssets(req, res, next) {

}


/**
 * Transfer ownership of asset.
 * @returns id of transaction
 */
function transferAsset(req, res, next) {

}

/**
 * Create User id asset.
 * @returns id of Asset
 */
function createUserIdAssetDL(req, res, next) {

  //console.log(req.body);
  //bdb.createAsset(req.body.signedTransaction)
  const user = req.user;
  user.modifiedAt = new Date();

  user.save()
    .then(savedUser => 
      bdb.transferAsset(req.body.signedTransaction)

      .then(resp =>

        res.json(savedUser);

      })
      .catch(rej =>
        next(rej)
      )

      res.json(savedUser)
      )
    .catch(e => next(e));

}

function createUserIdAssetBasic(req, res, next) { // add basic user to app collection
   const user = new User({                        // create an asset in BigchainDb
      publicKey: req.body.pubKey,
      mobileNumber: req.body.mobileNumber,
      email: req.body.email,
      firstName: req.body.firstName,
      lastName: req.body.lastName
    });
    user.save()

    .then(savedUser => 

      bdb.createAsset(req.body.signedTransaction)

      .then(resp =>

        res.json(savedUser);

      })
      .catch(rej =>
        next(rej)
      )
      //res.json(savedUser;

      )
    .catch(e => next(e));
}

/**
 * Mutate Asset ID.
 * @returns id of Asset
 */
function mutateUserIdAsset(req, res, next) {

}


/**
 * Get user transactions history.
 * @returns {Transactions}
 */
function getTransactions(req, res, next) {

  bdb.getTransactionByAsset(req.body.assetId)
  .then(transactions => res.json(transactions)
  )
  .catch( e => console.log(e) );
  
}

export default { load, get, create, update, list, remove, getTransactions, 
  createUserIdAssetDL, createUserIdAssetBasic };
//export default { getTransactions };
