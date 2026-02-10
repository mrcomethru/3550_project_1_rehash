const express = require("express")
const app = express();
const PORT = 8080;

const JWT = require("jsonwebtoken");
const { getValid, getExpired } = require ("./keygen");

app.use(express.json());
//JWKS endpoint to provide public keys that can be used to verify JWT signatures.
app.get("/.well-known/jwks.json", (req, res) => {
    //Only serve keys that haven't expired
    const validKeys = getValid();

    const jwks = {
        keys: validKeys.map((key) => {
        //Export public key in JWK format
        const jwk = key.publicKey.export({format: "jwk"});

        return {
        kty: jwk.kty,
        use: "sig",
        alg: "RS256",
        kid: key.kid,
        n: jwk.n,
        e: jwk.e,
        };
    })
    };
    res.json(jwks);
});

app.post("/auth", (req, res) => {
    const wantExpired = req.query.expired === "true";

    let pool;
    if (wantExpired) {
        pool = getExpired();
    } else {
        pool = getValid();
    }
    const key = pool[0];
    if (!key) {
        return res.status(500).json({error:"No key was found"});
    }

    const payload = {
        user: "testAccount",
        iat: Math.floor(Date.now()/1000),
        exp: Math.floor(key.expiry/1000)
    };

    const token = JWT.sign(payload, key.privateKey, {
        algorithm: "RS256",
        keyid: key.kid,
    });
    res.json({token});
});

if (require.main === module) {
    app.listen(PORT, ()=> {
    console.log("JWKS Server is now running on port 8080");
    console.log("Generating key pairs")
});
}

module.exports = app;