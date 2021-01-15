import * as express from 'express'
import { ItemController } from '../../controllers'

export default class ItemRoutes {
  public itemController: ItemController = new ItemController()

  public routes( router: express.Router ): void {

    router.post('/item/', this.itemController.createItem )
  }
}