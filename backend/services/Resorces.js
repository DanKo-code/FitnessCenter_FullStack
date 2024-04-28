import AbonnementRepository from "../repositories/Abonnement.js";
import OrderRepository from "../repositories/Order.js";

class ResourcesService {
    static async getAllAbonnements() {
        let abonnements = [];
        try {
            abonnements = await AbonnementRepository.getAllAbonnements();

        } catch (e) {
            console.log(JSON.stringify(e));
        }

        return abonnements;
    }

    static async getOrdersByUser(clientId) {
        let userOrders = [];
        try {
            userOrders = OrderRepository.getOrdersByUser(clientId);
        } catch (e) {
            console.log(JSON.stringify(e));
        }

        return userOrders
    }

    static async createOrder(clientId){

    }
}

export default ResourcesService;