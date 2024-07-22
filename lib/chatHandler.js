const WebSocket = require('ws');
const http = require('http');
const path = require('path');
const fs = require('fs');


// 1. Create ServerS
//------------
// 2 Initialize the WS Server
const chatHandler (){

    ws = new WebSocket('https://nodejscourse-prod-dlp5.onrender.com');

    // 3 ---- Handling Client connection
    ws.on('connection', ws => {
        // A
        ws.on('message', message => {

            console.log(`Resived ${message}`);

            wss.clients.forEach(client => {
                if (client.readyState === WebSocket.OPEN) {
                    client.send(message);
                }
            });
        });

        // B Send 'connection' message
        console.log(`Client connected`);
        ws.send('Welcome the chat');
    })

}

module.exports = { chatHandlerServer };