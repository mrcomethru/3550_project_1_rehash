# 3550_project_1_rehash
Restful JWKS server that provides public keys with unique identifiers for verifying JSON Web Tokens.

# Features
*Implements key expiry for enhanced security
*Inlucdes an authentication endpoint
*Handles issuance of JWTs with expired keys based on a query paramter

# Requirements
Node.js 15 or higher

# Testing
--Run the test script using node test.js in the correct directory

or

1. Run the server using node server.js
2. Run test commands via another terminal
* To get JWKS
 curl -s http://localhost:8080/.well-known/jwks.json | jq
* To get a valid token
 curl -s -X POST http://localhost:8080/auth | jq
* To get an expired token
curl -s -X POST "http://localhost:8080/auth?expired=true" | jq






