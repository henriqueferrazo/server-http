const http = require('http');
const fs = require('fs');
const path = require('path');


const server = net.createServer((socket) => {
    socket.on('connect', (socket) => {
        socket.on('data', (data) => {
            console.log(`cliente escreveu: ${data}` );
        })
    })
});

server.listen(8080, () => {
    console.log("servidor rodando na porta 8080");
});