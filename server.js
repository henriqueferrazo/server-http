const http = require('http');
const fs = require('fs');
const path = require('path');


http.createServer((req, res) => {
    console.log('req', req.url);
})
