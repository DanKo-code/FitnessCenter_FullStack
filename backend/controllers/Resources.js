import AuthService from "../services/Auth.js";
import ResourcesService from "../services/Resorces.js";
import {COOKIE_SETTINGS} from "../constants.js";
import ErrorsUtils, {Unauthorized} from "../utils/Errors.js";
import prismaClient from "../../prisma/Clients.js";
import UserRepository from "../repositories/User.js";
import TokenService from "../services/Token.js";
import {v4 as uuidv4} from "uuid";
import OrderRepository from "../repositories/Order.js";
import AbonnementRepository from "../repositories/Abonnement.js";

class ResourcesController {
    static async abonnements(req, res) {
        try{
            const abonnements = await ResourcesService.getAllAbonnements();

            res.status(200).json(abonnements);
        }
        catch(err) {
            return ErrorsUtils.catchError(res, err);
        }
    }

    static async ordersByUser(req, res) {
        try{
            const user = await AuthService.getUserByToken(req);
            const userOrders = await ResourcesService.getOrdersByUser(user.id);
            res.status(200).json(userOrders)
        }catch (e){
            res.status(400).json({message: 'Orders can\'t be retrieved'})
        }
    }

    static async createOrder(req, res){
        try{

            const user = await AuthService.getUserByToken(req);

            if(!req.body.abonnement.Id){
                return res.status(404).json({ message: 'Abonnement not exists' });
            }

            const abonnement = await AbonnementRepository.getAbonnementByTitle(req.body.abonnement.Title);

            if (!abonnement) {
                return res.status(404).json({ message: 'Abonnement not exists' });
            }

            const orderId = uuidv4();
            const abonementId = abonnement.Id;
            const clientId = user.id;
            const order = OrderRepository.createOrder({orderId, abonementId, clientId})


            res.status(200).json(order)
        }catch (e){
            res.status(400).json({message: 'Orders can\'t be retrieved'})
        }
    }

    static async updateClient(req, res){
        try{
            const user = await AuthService.getUserByToken(req);

            const clientId = user.id;
            const firstName = req.body.firstName;
            const lastName = req.body.lastName;
            const password = req.body.password;
            const client = await UserRepository.updateUser({clientId, firstName, lastName, password});

            res.status(200).json(client)
        }catch (e){
            res.status(400).json({message: 'Client hasn\'t been updated'})
        }
    }
}

export default ResourcesController;