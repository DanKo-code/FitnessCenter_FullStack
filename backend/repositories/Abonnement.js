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

    //id, title, validityPeriod, visitingTime, price, services
    static async updateAbonement({abonementId, title, validityPeriod, visitingTime, price, services}) {

        try{
            let oldServices = await prismaClient.abonementService.findMany({
                where: {
                    AbonementsId: abonementId
                }
            })

            oldServices = oldServices.map(abonementServices => abonementServices.ServicesId)
            const newServiceIds = services.map(service => service.Id);
            const servicesToAdd = newServiceIds.filter(id => !oldServices.includes(id));
            oldServices.push(...servicesToAdd);
            const servicesToRemove = oldServices.filter(id => !newServiceIds.includes(id))

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

                console.log('before deletedServices')
                let deletedServices = await prismaClient.abonementService.deleteMany({
                    where:{
                        AbonementsId: abonementId,
                        ServicesId: {in: servicesToRemove}
                    }
                })
                console.log('after deletedServices')

                console.log('deletedServices: '+JSON.stringify(deletedServices, null, 2))
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

            console.log('reterned abonement: '+JSON.stringify(abonement, null, 2))
            return abonement;
        }catch (e){
            console.log('e: '+JSON.stringify(e, null, 2))
        }
    }
}

export default AbonnementRepository;
