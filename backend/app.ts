import * as express from "express";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import { createServer, Server } from 'http';

import { authRoutes, itemRoutes } from './routes/index'

export default class App {
    private port: Number;
    private app: express.Application = new express();
    private server: Server;

    constructor(port: number) {
        this.port = port;

        this.createServer();
        this.connectMongoose();
        this.routes();

        //this.app.use( '/api', authRoutes );
        this.app.use( '/api', itemRoutes );
    }

    private connectMongoose(): void {
        mongoose.connect('mongodb+srv://admin:?@cluster0.8mq8k.mongodb.net/<dbname>?retryWrites=true&w=majority',
        { useNewUrlParser: true,
            useUnifiedTopology: true })
        .then(() => console.log('Connexion à MongoDB réussie !'))
        .catch(() => console.log('Connexion à MongoDB échouée !'));
    }

    private routes() : void {
        this.app.use( ( req, res, next ) => {
            res.setHeader( 'Access-Control-Allow-Origin', '*' );
            res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
            res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS' );
            next();
          } );
          
        this.app.use( bodyParser.json() );
    }

    private createServer(): void {
        this.server = createServer(this.app);
    }

    private errorHandler( error ): void {
        if (error.syscall !== 'listen') {
            throw error;
          }
          const address = this.server.address();
          const bind = typeof address === 'string' ? 'pipe ' + address : 'port: ' + this.port;
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
    }


    public run(): void {
        this.server.on( 'error', error => this.errorHandler );

        this.server.on('listening', () => {
            const address = this.server.address();
            const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + this.port;
            console.log('Listening on ' + bind);
          });
          
          this.server.listen(this.port);
    }
}