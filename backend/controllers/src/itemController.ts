import { Request, Response } from 'express'
import RequestController from './RequestController'
import Item from '../../models/Item'

export default class ItemController extends RequestController {
    
    constructor() {
        super()
      }

    /**
     * Route permettant de créer un item 'todo' lié à un utilisateur,
     * renvoie l'objet en cas de succès et dans le cas d'une erreur un message
     * significatif
     * @param req Request object
     * @param res Response object
     */
    public createItem( req: Request, res: Response ) {

        const { itemTitle, userId } = req.body

        if ( !itemTitle || !userId ) {
            return super.sendMissingFieldsError(res)
        }

        const item = new Item( {
            title: itemTitle,
            userId: userId
        } );

        item.save()
            .then( () => {
                return super.sendSuccess(res, item)
            } )
            .catch( error => {
                return super.sendErrorMessage(res, error)
            })
    }
}