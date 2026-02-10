const crypto = require("crypto");
let keys = [];
//Function to generate key pair
function generateKeyPair(expired = false){
    const { publicKey, privateKey } = crypto.generateKeyPairSync("rsa",{
        modulusLength: 2048
    });

const kid = crypto.randomBytes(16).toString("hex");
//Expiration logic: set time back one hour to represent expired key
//& set time forward one hour to represent valid key..
let expiry;

if (expired){
    expiry = Date.now() - 3600000;
} else {
    expiry = Date.now() + 3600000;
}

const keyObject = {
    kid,
    publicKey,
    privateKey,
    expiry
};
//pushing generated key onto key array
keys.push(keyObject);

return keyObject;
}
//Creating an expired key and a non expired key...
generateKeyPair(false);
generateKeyPair(true);

function getValid() {
    const now = Date.now();
    return keys.filter((key) => key.expiry > now);
}
function getExpired(){
    const now = Date.now();
    return keys.filter((key) => key.expiry < now);
}

module.exports = {
    getValid,
    getExpired,
};