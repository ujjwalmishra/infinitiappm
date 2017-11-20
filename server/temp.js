const driver = require('bigchaindb-driver');
const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
const alice = new driver.Ed25519Keypair();

function showKeyPair(req, res) {
    console.log(alice);
    res.json(alice);
}

function getSignedMessage(req,res) {
    const message = req.body.publicKey;
    const secretKey = req.body.privateKey;
    console.log(message);
    console.log(secretKey);
    //const signedMessage = new Unit8Array(2);
    //console.log(typeof nacl.sign(message, secretKey));
    //console.log(signedMessage[0]);
    res.json({data:"PASSED"});
    
}

function checkSignedMessage(req, res) {
    const signedMessage = req.body.signedMessage;
    const publicKey = req.body.publicKey;
    const message = nacl.sign.open(signedMessage, publicKey);
    if(message == publicKey){
        res.json({data:"PASSED"})
    }else{
        res.json({data:"FAILED"})
    }
}

export default {showKeyPair, getSignedMessage, checkSignedMessage};