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

            console.log('validityPeriod: '+JSON.stringify(validityPeriod, null, 2))

            /*const updateData = {
                Title: title,
                Validity: validityPeriod,
                VisitingTime: visitingTime,
                Price: Number(price),
            };*/

            let oldServices = await prismaClient.abonementService.findMany({
                where: {
                    AbonementsId: abonementId
                }
            })

            oldServices = oldServices.map(abonementServices => abonementServices.ServicesId)
            const newServiceIds = services.map(service => service.ServicesId);
            const servicesToAdd = newServiceIds.filter(id => !oldServices.includes(id));
            oldServices.push(...servicesToAdd);
            const servicesToRemove = oldServices.filter(id => !newServiceIds.includes(id))

            if(servicesToAdd.length > 0){

                const abonementServiceToAdd = servicesToAdd.map(serviceId => ({
                    AbonementsId: abonementId,
                    ServicesId: serviceId
                }));

                let addedServices = await prismaClient.abonementService.createMany({
                    data: abonementServiceToAdd
                })
            }

            if(servicesToRemove > 0){
                const abonementServiceToRemove = servicesToRemove.map(serviceId => ({
                    AbonementsId: abonementId,
                    ServicesId: serviceId
                }));

                let addedServices = await prismaClient.abonementService.deleteMany({
                    where:{
                        AbonementsId: abonementId,
                        ServicesId: {in: servicesToRemove}
                    }
                })
            }

            console.log('before update')

            console.log('title: '+title)
            console.log('validityPeriod: '+validityPeriod)
            console.log('visitingTime: '+visitingTime)
            console.log('price: '+price)
            console.log('Number(price): '+Number(price))

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
            console.log('after update')

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
        }catch (e){
            console.log('e: '+JSON.stringify(e, null, 2))
        }
    }
}

export default AbonnementRepository;
