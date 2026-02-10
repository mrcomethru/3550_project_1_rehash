const app = require("./server")
const axios = require ("axios");

const URL = "http://localhost:8080";

async function test() {
    console.log("Starting tests\n");
  
    try {
    //Attempt to get JWKS  
    console.log("Test 1.) Get JWKS");
    const response1 = await axios.get(`${URL}/.well-known/jwks.json`);
    console.log("Reponse: ", JSON.stringify(response1.data, null, 2));
    console.log(`Total number of valid keys: ${response1.data.keys.length}\n`)
    
    //Attempt to get a valid token
    console.log("Test 2.) Get a valid JWT");
    const response2 = await axios.post(`${URL}/auth`);
    console.log("Valid Token:", response2.data.token, "n")

    //Attempt to get an expired token
    console.log("Test 3.) Get an expired JWT")
    const response3 = await axios.post(`${URL}/auth?expired=true`);
    console.log("This is an expired token.");

    console.log("Test complete");
    process.exit(0);
    } catch (error) {
        console.error("Test failed");
        process.exit(1);
    }
}

const server = app.listen(8080, ()=> {
    console.log("Test server running on port 8080\n");
    setTimeout(test, 300);
});