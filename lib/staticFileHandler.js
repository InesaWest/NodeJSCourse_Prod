// 1. Insert http module
const http = require("http");
const path = require("path");

const fs = require("fs");

//2. Create a Server.

const staticFileHandler = (request, response) => {

    // Create a defult request/response
    //response.end('Hello Word');

    // 3.1. Parse URL and  determine filename

    console.log(`Request URL: ${request.url}`);

    const url = request.url === '/' ? 'index.html' : request.url;

    const filePath = path.join(__dirname, "public", url);
    console.log(`filePath: ${filePath}`);

    const fileExt = path.extname(filePath)


    ////  case
    let contentType = '';

    switch (fileExt) {

        case '.html':
            contentType = 'text-html';
            break;

        case '.jpg':
            contentType = 'image/jpeg';
            break;

        case '.css':
            contentType = 'text/css';
            break;

        default:
            contentType = 'text-html';
            break;
    };

    // 3.2. If no 'path' is defined, return 'index.html'
    // 3.3. Else look for the define FILE

    fs.readFile(filePath, (error, content) => {

        // 1. Check for errors if error exists return 404.html
        if (error) {

            if (error.code === 'ENOENT') {

                const errorFile = path.join(__dirname, "public", '404.html');
                fs.readFile(errorFile, (err, data) => {

                    // Assumption all is well.
                    response.writeHead(404, { 'Content-Type': contentType });
                    response.end(data, 'utf8');
                })
            } else {

                //default 
                response.writeHead(500);
                response.end(`Server error: ${error.code}`);
            }

        } else {

            // 2. If all is well return file
            response.writeHead(200, { 'Content-Type': contentType });
            response.end(content, 'utf8');

        }
    })

    //  response.end('Testing');
};

module.exports = { staticFileHandler };
