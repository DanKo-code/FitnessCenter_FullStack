import { Router } from "express";
import ResourcesController from "../controllers/Resources.js";
import AuthValidator from "../validators/Auth.js";
import TokenService from "../services/Token.js";


const router = Router();

router.get("/abonnements", TokenService.checkAccess, ResourcesController.abonnements);
router.get("/ordersByUser", TokenService.checkAccess, ResourcesController.ordersByUser);
router.post("/orders", TokenService.checkAccess, ResourcesController.createOrder);
router.post("/clients", TokenService.checkAccess, ResourcesController.updateClient);

export default router