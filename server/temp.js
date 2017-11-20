const driver = require('bigchaindb-driver');
const nacl = require('tweetnacl');
nacl.util = require('tweetnacl-util');
const alice = new driver.Ed25519Keypair();

function showKeyPairBDB(req, res) {
    console.log(alice);
    res.json(alice);
}

function getNaclKeyPair32(req, res){
    const obj = nacl.box.keyPair();
    //console.log("*************************"+typeof obj);
    //console.log("*************************"+obj)
    const publicKey = nacl.util.encodeBase64(obj.publicKey);
    const secretKey = nacl.util.encodeBase64(obj.secretKey);
    //console.log("***************************"+publicKey);
    //console.log("***************************"+secretKey);
    res.json({"publicKey":publicKey,"privateKey":secretKey});
}

function getNaclKeyPair64(req, res){
    const obj = nacl.sign.keyPair();
    //console.log("*************************"+typeof obj);
    //console.log("*************************"+obj)
    const publicKey = nacl.util.encodeBase64(obj.publicKey);
    const secretKey = nacl.util.encodeBase64(obj.secretKey);
    //console.log("***************************"+publicKey);
    //console.log("***************************"+secretKey);
    res.json({"publicKey":publicKey,"privateKey":secretKey});
}

function getSignedMessage(req,res) {
    /* **** Decodes Base-64 encoded string and returns Uint8Array of 
                        bytes (as required by nacl parameters).****/
    const message = nacl.util.decodeBase64(req.body.publicKey);     // signing the public key as message
    const secretKey = nacl.util.decodeBase64(req.body.privateKey);     //64-byte
    //console.log("*********1111****************"+message);
    //console.log("**********22222***************"+secretKey);
    //console.log("*********33333***************"+typeof nacl.sign(message, secretKey));  // 64-byte secret key
    //console.log("*********44444***************"+nacl.sign(message, secretKey));
    const signedMessageRaw = nacl.sign(message, secretKey);
    const signedMessageEncoded = nacl.util.encodeBase64(signedMessageRaw);
    console.log(signedMessageEncoded);
    res.send(signedMessageEncoded);
    
}

function checkSignedMessage(req, res) {
    const signedMessageRaw = req.body.signedMessage;
    const signedMessage = nacl.util.decodeBase64(signedMessageRaw);
    const publicKeyRaw = req.body.publicKey;
    const publicKey =nacl.util.decodeBase64(publicKeyRaw);
    const messageUint = nacl.sign.open(signedMessage, publicKey);
    const messageEncoded = nacl.util.encodeBase64(messageUint);
    if(messageEncoded == publicKeyRaw){
        res.json({"data":"PASSED","message":messageEncoded })
    }else{
        res.json({data:"FAILED","message":messageEncoded})
    }
}

export default {showKeyPairBDB, getNaclKeyPair32, getNaclKeyPair64, getSignedMessage, checkSignedMessage};