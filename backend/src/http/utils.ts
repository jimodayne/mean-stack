import http = require('http');
import path = require('path');
import fs = require('fs');

export const getContentType = (extname: string) => {
    switch (extname) {
        case '.html':
            return 'text/html';
        case '.js':
            return 'text/javascript';
        case '.css':
            return 'text/css';
        case '.json':
            return 'application/json';
        case '.png':
            return 'image/png';
        case '.jpg':
            return 'image/jpg';
        default:
            return 'text/plain';
    }
};

export const handleReadFile = (err: NodeJS.ErrnoException, content: Buffer, res: http.ServerResponse) => {
    if (err && err.code === 'ENOENT') {
        if (err.code === 'ENOENT') {
            const errorPath = path.join(__dirname, '..', '..', 'public', '404.html');

            fs.readFile(errorPath, (_, content) => {
                res.writeHead(404, { 'Content-Type': 'text/html' });
                res.end(content);
            });
        } else {
            res.writeHead(500);
            res.end(`Server Error: ${err.code}`);
        }
    } else {
        res.end(content);
    }
};
