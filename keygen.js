const crypto = require("crypto");
let keys = [];
//Function to generate key pair
function generateKeyPair(expired = false){
    const { publicKey, privateKey } = crypto.generateKeyPairSync('rsa',{
        modulusLength: 2048
    });

const kid = crypto.randomBytes(16).toString('hex');
//Expiration logic: set time back one hour to represent expired key
let expiry;

if (expired){
    expiry = Date.now() - 3600000;
} else {
    expiry = Date.now() + 3600000;
}

return keypair = {
    kid,
    publicKey,
    privateKey,
    expiry
};
}
//Create an expired key pair and a non-expired RSA key pair
generateKeyPair(false);
generateKeyPair(true);

function getValid() {
    const now = Date.now();
    return keys.filter(key => key.expiry > now);
}
function getExpired(){
    const now = Date.now();
    return keys.filter(key => key.expiry < now);
}

module.exports = {
    getValid,
    getExpired,
};