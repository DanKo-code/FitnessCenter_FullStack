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
}

export default CoachRepository;