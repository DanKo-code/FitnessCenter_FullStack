import prismaClient from "../../prisma/Clients.js";

class ServiceRepository {
    static async getAllServices() {
        const services = await prismaClient.service.findMany();

        return services;
    }
}

export default ServiceRepository;