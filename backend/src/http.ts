import http = require('http');
import path = require('path');
import fs = require('fs');

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

    if (routeName in CONTENT) {
        // Return HTML
        const filePath = path.join(__dirname, '..', 'public', CONTENT[routeName] + '.html');
        fs.readFile(filePath, (err, content) => handleReadFile(err, content, res));
    } else if (routeName in DATA) {
        // Return JSON
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(DATA[routeName]));
    } else {
        // Fallback return 404
        res.writeHead(404);
        res.end('<h1>404 - Page not found</h1>');
    }
});

server.listen(PORT, () => {
    console.log('Listening on port ', PORT);
});

const handleReadFile = (err: NodeJS.ErrnoException, content: Buffer, res: http.ServerResponse) => {
    if (err) throw err;
    res.writeHead(200, { 'Content-Type': 'text/html' });
    res.end(content);
};
