const express = require('express')
const app = express();

app.get('/well-known/jwks.json', (req, res) => {
    
})

const JWT = require("jsonwebtoken");

const url = require('url');

const keys = [];


app.use(express.json());


const port = 8080;
app.get()