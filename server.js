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

    let contentType = mimeTypes[extname] || 'application/octet=stream';

    fs.readFile(filePath, (error, content) => {
        if ( error ) {
            if( error.code == 'ENOENT' ) {
                fs.readFile('./404.html', (error, content) => {
                    res.writeHead(404, { 'Content-Type' : 'text/html' });
                    res.end( content, 'utf-8' );
                })
            } else {
                res.writeHead(500);
                res.end(`Desculpe, contate o responsavel pelo servidor para informar o erro ${error.code} ...` )
            }
        } else {
            res.writeHead(500);
            res.end(content, 'utf-8');
        }
    });

}).listen(8080);
console.log("Servidor executando em http://127.0.0.1:8080/");
