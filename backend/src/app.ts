import express from 'express'
//import * as cors from 'cors'
import * as bodyParser from 'body-parser'
//import * as cookieParser from 'cookie-parser'
//import * as socketIo from 'socket.io'
import { connect } from 'mongoose'
import { createServer, Server } from 'http'

var config = require('../appconfig.json');

import {
    AuthRoutes
} 
from './routes'

import {
  UserModel,
  UserItemModel
}
from './models'

export default class App {
  private port: number
  private io: any
  private server: Server
  public app: express.Application = express()
  public router: express.Router = express.Router()
  public authRoutes: AuthRoutes = new AuthRoutes()

  public userModel: UserModel = new UserModel()
  public userItemModel: UserItemModel = new UserItemModel()


  constructor(port: number) {
    this.port = port
    this.server = createServer(this.app)

    this.config()
    this.routes()
    this.initBDD()

    this.authRoutes.routes( this.router )
  }

  private config(): void {
    //this.app.use(cors())
    //this.app.use(cookieParser())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
  }

  private routes(): void {
    this.app.use( ( req, res, next ) => {
      res.setHeader( 'Access-Control-Allow-Origin', '*' );
      res.setHeader( 'Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization' );
      res.setHeader( 'Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS' );
      next();
    } );

  }

  private initBDD(): void {
    this.connectBDD()
    this.modelBDD()
  }

  private connectBDD(): void {
    connect('mongodb+srv://'+ config.mongoose.login +':'+config.mongoose.password+'@cluster0.8mq8k.mongodb.net/<dbname>?retryWrites=true&w=majority',
    { useNewUrlParser: true,
      useUnifiedTopology: true })
    .then(() => console.log('Connexion à MongoDB réussie !'))
    .catch(() => console.log('Connexion à MongoDB échouée !'));

  }

  private modelBDD(): void {
    this.userModel.generateSchema()
    this.userItemModel.generateSchema()
  }

  public run(): void {
    this.server.on('listening', () => {
      const address = this.server.address();
      const bind = typeof address === 'string' ? 'pipe ' + address : 'port ' + this.port;
      console.log('Listening on ' + bind);
    });
    
    this.server.listen(this.port);
  }
}