const http = require('http');
const fs = require('fs');
const path = require('path');
const url = require('url');

const port = 8080;

let mapMimeType = {
    '.html': 'text/html',
    '.json': 'application/json',
    '.png': 'image/png',
    '.jpg': 'image/jpg',
    '.pdf': 'application/pdf',
    '.doc': 'application/doc'
}

http.createServer((req, res) => {
    console.log('req', req.url);

    const parseUrl = url.parse(req.url);
    if(parseUrl.pathname === "/") {
        let filesLink = '<ul>';
        res.setHeader('Content-type', 'text/html');
        let filesList = fs.readdirSync("./public");

        filesList.forEach( el => {
            if(fs.statSync("./public/" + el).isFile() ) {
                filesLink += `<br/><li><a href = './${el}'>
                ${el}
                </a></li>`;
            }
        });

        filesLink += '</ul>';
        res.end("<h1> Lista de Arquivos:<h1>" + filesLink);
    }

    const sanitizePath = path.normalize(parseUrl.pathname).replace(/^(\.\.[\/\\])+/, '');
    let pathname = path.join(__dirname, sanitizePath);

    if (!fs.existsSync(pathname)) {
        res.statusCode = 404;
        res.end(`Arquivo ${pathname} não encontrado!`)
    } else {
        fs.readFile(pathname, (err, data) => {
            if(err) {
                res.statusCode = 500;
                res.end(`Erro ao ler o arquivo ${pathname}`);
            } else {
                const extensions = path.parse(pathname).ext;
                res.setHeader('Content-type', mapMimeType[extensions] || 'text/plain');
                res.end(data);
            }
        })
    }
}).listen( port, () => {
    console.log(`Servidor executando em http://127.0.0.1:8080/`);
});
