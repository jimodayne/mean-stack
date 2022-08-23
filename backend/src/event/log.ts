import EventEmitter = require('events');
import { v4 } from 'uuid';

class Logger extends EventEmitter {
    log(msg) {
        this.emit('message', { id: v4(), msg });
    }
}

const logger = new Logger();

logger.on('message', data => {
    console.log('Called Listener', data);
});

logger.log('Hello World');
logger.log('Terve');
logger.log('Tervetuloa!');
