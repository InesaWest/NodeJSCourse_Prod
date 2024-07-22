const WebSocket = require('ws');
const http = require('http');
const path = require('path');
const fs = require('fs');


// 1. Create ServerS
//------------
// 2 Initialize the WS Server
const chatHandlerServer = setup => {

    const wss = new WebSocket.Server({ chatHandlerServer });

    // 3 ---- Handling Client connection
    wss.on('connection', ws => {
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