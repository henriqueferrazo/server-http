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

    const parseUrl = url.parse(req.url);
    const pathURLname = `${parseUrl.pathname}`;
    if(pathURLname === "/") {
        let filesLink = '<ul>';
        res.setHeader('Content-type', 'text/html');
        let filesList = fs.readdirSync("./");

        filesList.forEach( el => {
            if(fs.statSync("./" + el).isFile()) {
                filesLink += `<br/><li><a href="./${el}">
                ${el}
                </a></li>`;
            }
        });

        filesLink += '</ul>';
        res.end("<h1> Lista de Arquivos:<h1>" + filesLink);
    }

    if (!fs.existsSync(pathURLname)) {
        res.statusCode = 404;
        res.end(`Arquivo ${pathURLname} não encontrado!`);
    } else {
        fs.readFile(pathURLname, (err, data) => {
            if(err) {
                console.log(err);
                res.statusCode = 500;
                res.end(`Erro ao ler o arquivo ${pathURLname}`);
            } else {
                const extensions = path.parse(pathURLname).ext;
                res.setHeader('Content-type', mapMimeType[extensions] || 'text/plain');
                res.end(data);
            }
        })
    }
}).listen( port, () => {
    console.log(`Servidor executando em http://127.0.0.1:${port}/`);
});
