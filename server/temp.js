const driver = require('bigchaindb-driver');
const nacl = require('tweetnacl');
const Base58 = require("base-58");
nacl.util = require('tweetnacl-util');
const alice = new driver.Ed25519Keypair();

const alicePublic = Base58.decode(alice.publicKey);     //we receive base 58 encoded key from BDB
const alicePrivate = Base58.decode(alice.privateKey);   //we receive base 58 encoded key from BDB
//********Generating the 64 byte private key for nacl message signing */
const aliceSecretTemp = (Array.from(alicePrivate)).concat(Array.from(alicePublic));    
const aliceSecret = new Uint8Array(aliceSecretTemp);
// console.log(aliceSecret.length);
// console.log("***************************************");
let signedMessage;
const message = alicePublic;
const secretKey = aliceSecret;
const signedMessageRaw = nacl.sign(message, secretKey);


////////********START OF TESTING CODE FOR REFERENC********//////////
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
    const secretKey = nacl.util.encodeBase64(obj.secretKey.slice(0,32));
    //console.log("***************************"+publicKey);
    //console.log("***************************"+secretKey);
    res.json({"publicKey":publicKey,"privateKey":secretKey});
}

function getSignedMessage(req,res) {
    /* **** Decodes Base-64 encoded string and returns Uint8Array of 
                        bytes (as required by nacl parameters).****/
    const message = nacl.util.decodeBase64(alice.publicKey);     // signing the public key as message
    const secretKey = nacl.util.decodeBase64(aliceSecret);     //64-byte
    //console.log("*********1111****************"+message);
    //console.log("**********22222***************"+secretKey);
    //console.log("*********33333***************"+typeof nacl.sign(message, secretKey));  // 64-byte secret key
    //console.log("*********44444***************"+nacl.sign(message, secretKey));
    const signedMessageRaw = nacl.sign(message, secretKey);
    const signedMessageEncoded = nacl.util.encodeBase64(signedMessageRaw);
    signedMessage = signedMessageRaw;
    console.log(signedMessageEncoded);
    res.send(signedMessageEncoded);
    
}

////////********END OF TESTING CODE FOR REFERENC********//////////

function checkSignedMessage(req, res) {
    //******************opening the signed message ****/
    const publicKeyRaw =  nacl.util.encodeBase64(alicePublic);
    const publicKey =alicePublic;
    const messageUint = nacl.sign.open(signedMessageRaw, alicePublic);
    const messageEncoded = nacl.util.encodeBase64(messageUint);
    if(messageEncoded == publicKeyRaw){
        res.json({"data":"PASSED","message":messageEncoded })
    }else{
        res.json({data:"FAILED","message":messageEncoded})
    }
}

export default {showKeyPairBDB, getNaclKeyPair32, getNaclKeyPair64, getSignedMessage, checkSignedMessage};