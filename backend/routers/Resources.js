import { Router } from "express";
import ResourcesController from "../controllers/Resources.js";
import AuthValidator from "../validators/Auth.js";
import TokenService from "../services/Token.js";
import ResourcesValidator from "../validators/Resources.js";


const router = Router();

router.get("/abonnements", TokenService.checkAccess, ResourcesController.abonnements);
router.get("/ordersByUser", TokenService.checkAccess, ResourcesController.ordersByUser);
router.post("/orders", TokenService.checkAccess, ResourcesValidator.postOrders, ResourcesController.createOrder);
router.put("/clients", TokenService.checkAccess, ResourcesValidator.putClients, ResourcesController.updateClient);
router.get  ("/coaches", TokenService.checkAccess, ResourcesController.coaches);
router.post  ("/comments", TokenService.checkAccess, ResourcesValidator.postComments, ResourcesController.createComment);
router.get  ("/services", TokenService.checkAccess, ResourcesController.services);
router.put  ("/abonnements", TokenService.checkAccess, ResourcesValidator.putAbonement, ResourcesController.updateAbonement);
router.post  ("/abonnements", TokenService.checkAccess, ResourcesController.createAbonement);
router.delete  ("/abonnements/:abonementId", TokenService.checkAccess, ResourcesValidator.deleteAbonement, ResourcesController.deleteAbonement);
router.put  ("/coaches", TokenService.checkAccess, ResourcesValidator.putCoaches, ResourcesController.updateCoach);
router.post  ("/coaches", TokenService.checkAccess, ResourcesValidator.postCoaches, ResourcesController.createCoach);
router.delete  ("/coaches/:coachId", TokenService.checkAccess, ResourcesValidator.deleteCoaches, ResourcesController.deleteCoach);

export default router