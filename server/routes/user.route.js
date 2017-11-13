import express from 'express';
import validate from 'express-validation';
import paramValidation from '../../config/param-validation';
import userCtrl from '../controllers/user.controller';
import expressJwt from 'express-jwt';
import config from '../../config/config';

const router = express.Router(); // eslint-disable-line new-cap

router.route('/')
  /** POST /api/user - get list of user transactions */
  .post(validate(paramValidation.transactions), expressJwt({ secret: config.jwtSecret }), userCtrl.getTransactions);

router.route('/old')
  /** GET /api/user - Get list of user transactions */
  .get(userCtrl.list)

  /** POST /api/users - Create new user */
  .post(validate(paramValidation.createUser), userCtrl.create);

router.route('/old/:userId')
  /** GET /api/users/:userId - Get user */
  .get(userCtrl.get)

  /** PUT /api/users/:userId - Update user */
  .put(validate(paramValidation.updateUser), userCtrl.update)

  /** DELETE /api/users/:userId - Delete user */
  .delete(userCtrl.remove);

/** Load user when API with userId route parameter is hit */
router.param('/old/userId', userCtrl.load);

export default router;
