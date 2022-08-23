import http = require('http');
import path = require('path');
import fs = require('fs');

const PORT = process.env.PORT || 8080;

const CONTENT = {
    '/': 'Homepage',
    '/about': 'About',
};

const server = http.createServer((req, res) => {
    const url = new URL(req.url, `http://${req.headers.host}`);

    if (CONTENT[url.pathname]) {
        res.end(`<h1>${CONTENT[url.pathname]}</h1>`);
    } else {
        // Fallback return 404
        res.end('<h1>404 - Page not found</h1>');
    }
});

server.listen(PORT, () => {
    console.log('Listening on port ', PORT);
});
