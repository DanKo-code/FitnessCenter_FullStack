import { Router } from "express";
import ResourcesController from "../controllers/Resources.js";
import AuthValidator from "../validators/Auth.js";
import TokenService from "../services/Token.js";


const router = Router();

router.get("/abonnements", TokenService.checkAccess, ResourcesController.abonnements);
router.get("/ordersByUser", TokenService.checkAccess, ResourcesController.ordersByUser);
router.post("/orders", TokenService.checkAccess, ResourcesController.createOrder);
router.put("/clients", TokenService.checkAccess, ResourcesController.updateClient);
router.get  ("/coaches", TokenService.checkAccess, ResourcesController.coaches);
router.post  ("/comments", TokenService.checkAccess, ResourcesController.createComment);
router.get  ("/services", TokenService.checkAccess, ResourcesController.services);
router.put  ("/abonnements", TokenService.checkAccess, ResourcesController.updateAbonement);
router.post  ("/abonnements", TokenService.checkAccess, ResourcesController.createAbonement);
router.delete  ("/abonnements/:abonementId", TokenService.checkAccess, ResourcesController.deleteAbonement);

export default router