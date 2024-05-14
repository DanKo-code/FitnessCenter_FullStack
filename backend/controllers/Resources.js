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
import CoachRepository from "../repositories/Coach.js";
import CommentRepository from "../repositories/Comment.js";
import ServiceRepository from "../repositories/Service.js";

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

            const abonement = await AbonnementRepository.getAbonnementById(req.body.abonementId);

            if (!abonement) {
                return res.status(404).json({ message: 'Abonement not exists' });
            }

            const orderId = uuidv4();
            const abonementId = req.body.abonementId;
            const clientId = user.id;
            const order = await OrderRepository.createOrder({orderId, abonementId, clientId})

            res.status(200).json(order)
        }catch (e){
            res.status(400).json({message: 'Order can\'t be create'})
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

            console.log('err: '+JSON.stringify(e, null, 2))

            res.status(400).json({message: 'Client hasn\'t been updated'})
        }
    }

    static async updateAbonement(req, res){
        try{
            const abonementId = req.body.abonementId;
            const title = req.body.title;
            const validityPeriod = req.body.validityPeriod;
            const visitingTime = req.body.visitingTime;
            const price = req.body.price;
            const services = req.body.services;

            console.log('updateAbonement->services: '+JSON.stringify(services, null, 2))

            const abonement =
                await AbonnementRepository.updateAbonement({abonementId, title, validityPeriod, visitingTime, price, services});

            res.status(200).json(abonement);
        }catch (e){
            res.status(400).json({message: 'Abonement hasn\'t been updated'})
        }
    }

    static async coaches(req, res){
        try{
            const coaches = await CoachRepository.getAllCoaches();

            res.status(200).json(coaches)
        }catch (e){
            res.status(400).json({message: 'Сoaches can\'t be taken'})
        }
    }

    static async services(req, res){
        try{
            const services = await ServiceRepository.getAllServices();

            res.status(200).json(services)
        }catch (e){
            res.status(400).json({message: 'Services can\'t be taken'})
        }
    }

    static async createComment(req, res){
        try{

            const user = await AuthService.getUserByToken(req);

            if(!req.body.coachId){
                return res.status(404).json({ message: 'Coach not exists' });
            }

            const commentId = uuidv4();
            const comment = await CommentRepository.createComment({commentId, commentBody: req.body.reviewText , clientId: user.id, coachId: req.body.coachId});


            res.status(200).json(comment)
        }catch (e){
            res.status(400).json({message: 'Comment can\'t be created'})
        }
    }

    static async createAbonement(req, res){
        try{
            const abonementId = uuidv4();
            const title = req.body.title;
            const validityPeriod = req.body.validityPeriod;
            const visitingTime = req.body.visitingTime;
            const price = req.body.price;
            const services = req.body.services;

            const abonement =
                await AbonnementRepository.createAbonement({abonementId, title, validityPeriod, visitingTime, price, services});

            res.status(200).json(abonement);
        }catch (e){
            res.status(400).json({message: 'Abonement can\'t be created'})
        }

    }

    static async deleteAbonement(req, res){
        try{
            const abonementId = req.params.abonementId;

            const abonement =
                await AbonnementRepository.deleteAbonement(abonementId);

            res.status(200).json(abonement);
        }catch (e){
            res.status(400).json({message: 'Abonement can\'t be deleted'})
        }
    }

    static async updateCoach(req, res){
        try{
            const coachId = req.body.id;
            const name = req.body.name;
            const description = req.body.description;
            const services = req.body.services;

            const coach =
                await CoachRepository.updateCoach({coachId, name, description, services});

            res.status(200).json(coach);
        }catch (e){
            res.status(400).json({message: 'Coache can\'t be updated'})
        }
    }

    static async createCoach(req, res){
        try{
            const coachId = uuidv4();
            const name = req.body.name;
            const description = req.body.description;
            const services = req.body.services;

            const coach =
                await CoachRepository.createCoach({coachId, name, description, services});

            res.status(200).json(coach);
        }catch (e){
            res.status(400).json({message: 'Coache can\'t be created'})
        }
    }

    static async deleteCoach(req, res){
        try{
            const coachId = req.params.coachId;

            const coach =
                await CoachRepository.deleteCoach(coachId);

            res.status(200).json(coach);
        }catch (e){
            res.status(400).json({message: 'Coache can\'t be deleted'})
        }
    }
}

export default ResourcesController;