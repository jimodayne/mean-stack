import http = require('http');
import path = require('path');
import fs = require('fs');
import { getContentType, handleReadFile } from './utils';

const PORT = process.env.PORT || 8080;

const CONTENT = {
    '': 'index',
    about: 'about',
};

const DATA = {
    users: [
        { name: 'Jim', age: 20 },
        { name: 'Andrew', age: 19 },
    ],
};

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);
    const routeName = path.parse(url.pathname).name;
    const ext = path.parse(url.pathname).ext;
    const contentType = getContentType(ext || '.html');

    res.writeHead(200, { 'Content-Type': contentType });
    if (routeName in DATA && contentType === 'application/json') {
        // Return JSON
        res.end(JSON.stringify(DATA[routeName]));
    } else {
        // Return HTML
        const filePath = path.join(__dirname, '..', '..', 'public', CONTENT[routeName] + '.html');
        fs.readFile(filePath, (err, content) => handleReadFile(err, content, res));
    }
});

server.listen(PORT, () => {
    console.log('Listening on port ', PORT);
});
