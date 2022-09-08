import EventEmitter = require('events');

class MyEmitter extends EventEmitter {}

const myEmitter = new MyEmitter();

myEmitter.on('event', msg => {
    console.log('an event occurred!', msg);
});

myEmitter.emit('event', 'hey hey hey');
