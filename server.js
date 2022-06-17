const http = require('http');
const fs = require('fs');
const path = require('path');


http.createServer((req, res) => {
    console.log('req', req.url);

    let filePath = '.' + req.url;
    if( filePath == './' ) {
        filePath = './index.html';
    }

    let extname = String(path.extrame(filePath)).toLowerCase();
    let mimeType = {
        '.html': 'text/html',
        '.js': 'text/javascript',
        '.css': 'text/css',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.gif': 'image/gif',
        '.svg': 'image/svg+xml',
        '.wav': 'audio/wav',
        '.mp4': 'video/mp4',
        '.woff': 'application/font-woff',
        '.ttf': 'application/font-ttf',
        '.eot': 'application/vnd.ms-fontobject',
        '.otf': 'application/font-otf',
        '.wasm': 'application/wasm'
    }
})
