import prismaClient from "../../prisma/Clients.js";

class CoachRepository {
    static async getAllCoaches() {
        const coaches = await prismaClient.coach.findMany({
            include: {
                Comment: {
                    include:{
                        Client: true
                    }
                },
                CoachService: {
                    include: {
                        Service: true
                    }
                }
            }
        });

        return coaches;
    }

    static async updateCoach({coachId, name, description, services}) {

        let oldServices = await prismaClient.coachService.findMany({
            where: {
                CouchesId: coachId
            }
        })

        oldServices = oldServices.map(coachServices => coachServices.ServicesId.toUpperCase())
        const newServiceIds = services.map(serviceId=>serviceId.toUpperCase());
        const servicesToAdd = newServiceIds.filter(id => !oldServices.includes(id));
        oldServices.push(...servicesToAdd);
        const servicesToRemove = oldServices.filter(id => !newServiceIds.includes(id))

        console.log('oldServices: '+JSON.stringify(oldServices, null, 2))
        console.log('newServiceIds: '+JSON.stringify(newServiceIds, null, 2))
        console.log('servicesToAdd: '+JSON.stringify(servicesToAdd, null, 2))
        console.log('servicesToRemove: '+JSON.stringify(servicesToRemove, null, 2))

        if(servicesToAdd.length > 0){

            const coachesServiceToAdd = servicesToAdd.map(serviceId => ({
                CouchesId: coachId,
                ServicesId: serviceId
            }));

            let addedServices = await prismaClient.coachService.createMany({
                data: coachesServiceToAdd
            })
        }

        if(servicesToRemove.length > 0){
            const coachesServiceToRemove = servicesToRemove.map(serviceId => ({
                CouchesId: coachId,
                ServicesId: serviceId
            }));

            let deletedServices = await prismaClient.coachService.deleteMany({
                where:{
                    CouchesId: coachId,
                    ServicesId: {in: servicesToRemove}
                }
            })
        }

        await prismaClient.coach.update({
            where:{
                Id: coachId
            },
            data:{
                Name: name,
                Description: description
            }
        });

        const coach = await prismaClient.coach.findFirst({
            where:{
                Id: coachId
            },
            include: {
                CoachService: {
                    include: {
                        Service: true
                    }
                }
            }
        })

        return coach;
    }

    static async createCoach({coachId, name, description, services}) {

        const existingCoach = await prismaClient.coach.findFirst({
            where: {
                Name: name
            }
        })

        if(existingCoach){
            throw new Error('Coach with this name already existing');
        }

        const newCoachServices = services.map(serviceId => { return {
            CouchesId: coachId,
            ServicesId: serviceId
        }})

        const coach = await prismaClient.coach.create({
            data:{
                Id: coachId,
                Name: name,
                Description: description
            }
        });

        await prismaClient.coachService.createMany({
            data: newCoachServices
        })

        const coachToReturn = await prismaClient.coach.findFirst({
            where:{
                Id: coachId
            },
            include: {
                CoachService: {
                    include: {
                        Service: true
                    }
                }
            }
        })

        return coachToReturn;
    }

    static async deleteCoach(coachId) {
        const coach = await prismaClient.coach.delete({
            where:{
                Id: coachId,
            }
        });

        return coach;
    }
}

export default CoachRepository;