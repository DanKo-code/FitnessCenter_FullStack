import prismaClient from "../../prisma/Clients.js";

class OrderRepository {
    static async getOrdersByUser(clientId){
        const userOrders = await prismaClient.order.findMany({
            where:{
                ClientsId: clientId
            },
            include: {
                Abonement: {
                    include: {
                        AbonementsService:{
                            include: {
                                Service: true
                            }
                        }
                    }
                }
            }
        })

        return userOrders;
    }

    static async createOrder({orderId, abonementId, clientId}){
        const order = await prismaClient.order.create({
            data: {
                Id: orderId,
                AbonementsId: abonementId,
                ClientsId: clientId,
                Status: 1
            }
        })

        return order;
    }
}

export default OrderRepository;