/**
 * {
    "user": {
        "_id": "601c441967b9300e7c396101",
        "username": "Osmos",
        "email": "jordan.lcq1@gmail.com",
        "password": "$2b$10$Kg/.39EGch0dzCisjyt49ep0GgcNi9tPOWIVj0y8kHuN3FcrvNztG",
        "created_at": "2021-02-04T18:59:38.097Z",
        "updated_at": "2021-02-04T18:59:38.097Z",
        "__v": 0
    }
}
 */

const http = require('http');
const app = require('./app');

const normalizePort = val => {
  const port = parseInt(val, 10);

  if (isNaN(port)) {
    return val;
  }
  if (port >= 0) {
    return port;
  }
  return false;
};
const port = normalizePort(process.env.PORT || '3000');
app.set('port', port);

const errorHandler = error => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + port;
  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges.');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use.');
      process.exit(1);
      break;
    default:
      throw error;
  }
};

const server = http.createServer(app);

server.on('error', errorHandler);
server.on('listening', () => {
  const address = server.address();
  const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + port;
  console.log('Listening on ' + bind);
});

server.listen(port);
