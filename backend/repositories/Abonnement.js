import prismaClient from "../../prisma/Clients.js";

class AbonnementRepository {
    static async getAllAbonnements() {
        const abonnements = await prismaClient.abonement.findMany({
            include: {
                AbonementsService: {
                    include: {
                        Service: true
                    }
                }
            }
        });

        return abonnements;
    }

    static async getAbonnementByTitle(abonementTitle){

        const abonnement = await prismaClient.abonement.findFirst({
            where: {
                Title: abonementTitle
            }
        });

        return abonnement
    }
}

export default AbonnementRepository;
