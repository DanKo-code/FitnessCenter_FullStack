import AuthService from "../services/Auth.js";
import {COOKIE_SETTINGS} from "../constants.js";
import ErrorsUtils from "../utils/Errors.js";
import prismaClient from "../../prisma/Clients.js";

class ResourcesController {
    static async abonnements(req, res, next) {

        console.log('abonnements')


        try{
            const abonnements = await prismaClient.abonement.findMany({
                include: {
                    AbonementsService: {
                        include: {
                            Service: true
                        }
                    }
                }
            });

            res.status(200).json(abonnements);
        }
        catch(err) {
            console.log('err!!!!');
            return ErrorsUtils.catchError(res, err);
        }
    }
}

export default ResourcesController;