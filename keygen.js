const crypto = require("crypto");
let keys = [];

function generateKeyPair(expired = false){
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa',{
        modulusLength: 2048
    })
}