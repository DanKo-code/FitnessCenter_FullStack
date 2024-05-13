import prismaClient from "../../prisma/Clients.js";

class AbonnementRepository {
    static async getAllAbonnements() {
        const abonnements = await prismaClient.abonement.findMany({
            include: {
                AbonementService: {
                    include: {
                        Service: true
                    }
                }
            }
        });

        return abonnements;
    }

    static async getAbonnementByTitle(abonementTitle) {

        const abonnement = await prismaClient.abonement.findFirst({
            where: {
                Title: abonementTitle
            }
        });

        return abonnement
    }

    static async getAbonnementById(abonementId) {

        const abonnement = await prismaClient.abonement.findUnique({
            where: {
                Id: abonementId
            }
        });

        return abonnement
    }

    static async updateAbonement({abonementId, title, validityPeriod, visitingTime, price, services}) {

        let oldServices = await prismaClient.abonementService.findMany({
            where: {
                AbonementsId: abonementId
            }
        })

        oldServices = oldServices.map(abonementServices => abonementServices.ServicesId.toUpperCase())
        const newServiceIds = services.map(serviceId=>serviceId.toUpperCase());
        const servicesToAdd = newServiceIds.filter(id => !oldServices.includes(id));
        oldServices.push(...servicesToAdd);
        const servicesToRemove = oldServices.filter(id => !newServiceIds.includes(id))

        console.log('oldServices: '+JSON.stringify(oldServices, null, 2))
        console.log('newServiceIds: '+JSON.stringify(newServiceIds, null, 2))
        console.log('servicesToAdd: '+JSON.stringify(servicesToAdd, null, 2))
        console.log('servicesToRemove: '+JSON.stringify(servicesToRemove, null, 2))

        if(servicesToAdd.length > 0){

            const abonementServiceToAdd = servicesToAdd.map(serviceId => ({
                AbonementsId: abonementId,
                ServicesId: serviceId
            }));

            let addedServices = await prismaClient.abonementService.createMany({
                data: abonementServiceToAdd
            })
        }

        if(servicesToRemove.length > 0){
            const abonementServiceToRemove = servicesToRemove.map(serviceId => ({
                AbonementsId: abonementId,
                ServicesId: serviceId
            }));

            let deletedServices = await prismaClient.abonementService.deleteMany({
                where:{
                    AbonementsId: abonementId,
                    ServicesId: {in: servicesToRemove}
                }
            })
        }

        await prismaClient.abonement.update({
            where: {
                Id: abonementId
            },
            data: {
                Title: title,
                Validity: validityPeriod,
                VisitingTime: visitingTime,
                Price: Number(price),
            }
        })

        const abonement = await prismaClient.abonement.findFirst({
            where:{
                Id: abonementId
            },
            include: {
                AbonementService: {
                    include: {
                        Service: true
                    }
                }
            }
        })

        return abonement;
    }

    static async createAbonement({abonementId, title, validityPeriod, visitingTime, price, services}) {

        const existingAbonement = await prismaClient.abonement.findFirst({
            where:{
                Title: title
            }
        })

        if(existingAbonement){
            throw new Error('Abonement with this title already existing')
        }

        const newAbonementServices = services.map(serviceId => { return {
            AbonementsId: abonementId,
            ServicesId: serviceId
        }})

        const abonement = await prismaClient.abonement.create({
            data: {
                Id: abonementId,
                Title: title,
                Validity: validityPeriod,
                VisitingTime: visitingTime,
                Price: Number(price)
            }
        })

        await prismaClient.abonementService.createMany({
            data: newAbonementServices
        })

        const abonementToReturn = await prismaClient.abonement.findFirst({
            where:{
                Id: abonementId
            },
            include: {
                AbonementService: {
                    include: {
                        Service: true
                    }
                }
            }
        })

        return abonementToReturn;
    }

    static async deleteAbonement(abonementId) {

        const deletedAbonement = await prismaClient.abonement.delete({
            where: {
                Id: abonementId
            }
        })

        return deletedAbonement;
    }
}

export default AbonnementRepository;
