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
                CoachService: true
            }
        });

        return coaches;
    }

    static async updateCoach({coachId, name, description}) {
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

    static async createCoach({coachId, name, description}) {
        const coach = await prismaClient.coach.create({
            data:{
                Id: coachId,
                Name: name,
                Description: description
            }
        });

        return coach;
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