const http = require('http');
const fs = require('fs');
const path = require('path')
const url = require('url')


http.createServer((req, res) => {
    console.log('req', req.url);

    let parseUrl = url.parser(req.url);
    let pathName = `${parseUrl.pathName}`;
    let extensions = path.parser(pathName).extensions;

    let mapMimeType = {
        '.html': 'text/html',
        '.json': 'application/json',
        '.png': 'image/png',
        '.jpg': 'image/jpg',
        '.pdf' : 'application/pdf',
        '.doc' : 'application/doc'
    }

    fs.readFile(pathName, 'utf-8', (exist) => {
        if(!exist) {
          res.statusCode = 404;
          res.end(`File ${pathName} not found!`);
          return;
        }
    
        if (fs.statSync(pathName).isDirectory()) pathName += '/index' + ext;
    
        fs.readFile(pathName, 'utf-8', (err, data) => {
          if(err){
            res.statusCode = 500;
            res.end(`Error getting the file: ${err}.`);
          } else {
            res.setHeader('Content-type', map[ext] || 'text/plain' );
            res.end(data);
          }
        });
    });
}).listen( 8080, () => {
    console.log("Servidor executando em http://127.0.0.1:8080/");
});
