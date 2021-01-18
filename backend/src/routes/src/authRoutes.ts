import * as express from 'express'
import { AuthController } from '../../controllers/index'

export default class AuthRoutes {
    public authController: AuthController = new AuthController()

    public routes(router: express.Router): void {

    }
}