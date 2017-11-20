import express from 'express';
import bdbdriver from '../temp';

const router = express.Router(); // eslint-disable-line new-cap


router.route('/bdbkeypair')
/** POST api to get the public private key pair**/
    .post(bdbdriver.showKeyPairBDB);

router.route('/naclkeypair32')
/** POST api to get the public private(32 byte) key pair using nacl library**/
    .post(bdbdriver.getNaclKeyPair32);

router.route('/naclkeypair64')
/** POST api to get the public private(64 byte) key pair using nacl library**/
    .post(bdbdriver.getNaclKeyPair64);

router.route('/signmessage')
/** POST api to get the signed message**/
    .post(bdbdriver.getSignedMessage);

router.route('/verifymessage')
/** POST api to get the signed message**/
    .post(bdbdriver.checkSignedMessage);


export default router;