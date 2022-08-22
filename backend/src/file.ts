import path = require('path');
import fs = require('fs');

const helloFilePath = path.join(__dirname, '/test', 'hello.txt');

// Create a folder
fs.mkdir(path.join(__dirname, '/test'), function (err) {
    if (err) throw err;
    console.log('Folder test created...');
});

// Write file hello.text in /test
fs.writeFile(helloFilePath, 'Hello World!', err => {
    if (err) throw err;
    console.log('File written...');

    fs.appendFile(helloFilePath, ' I love Node.js', err => {
        if (err) throw err;
        console.log('File appended...');
    });
});

// Read file
fs.readFile(helloFilePath, 'utf-8', (err, data) => {
    console.log('data >> ', data);
});
