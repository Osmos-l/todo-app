import express from 'express'
//import * as cors from 'cors'
import * as bodyParser from 'body-parser'
//import * as cookieParser from 'cookie-parser'
//import * as socketIo from 'socket.io'
import { createServer, Server } from 'http'

require('dotenv').config()

import {
    AuthRoutes
} 
from './routes'

export default class App {
  private port: number
  private io: any
  private server: Server
  public app: express.Application = express()
  public router: express.Router = express.Router()
  public authRoutes: AuthRoutes = new AuthRoutes()


  constructor(port: number) {
    this.port = port
    this.server = createServer(this.app)
    this.config()
    this.createServer()
    this.routes()

    this.authRoutes.routes( this.router )
  }

  private config(): void {
    //this.app.use(cors())
    //this.app.use(cookieParser())
    this.app.use(bodyParser.json())
    this.app.use(bodyParser.urlencoded({ extended: false }))
  }

  private routes(): void {
    this.app.use('/', this.router)
  }

  private createServer(): void {
    this.server = createServer(this.app)
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