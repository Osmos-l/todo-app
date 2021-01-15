import { Request, Response } from 'express'
import RequestController from './RequestController';

export default class AuthController extends RequestController {
  
  constructor() {
    super()
  }

  public async standardLogin(req: Request, res: Response): Promise<Response> {
    
  }

  public async standardRegister(req: Request, res: Response): Promise<Response> {
  }

}