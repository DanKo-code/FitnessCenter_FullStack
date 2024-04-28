import prismaClient from "../../prisma/Clients.js";

class UserRepository {
    static async createUser({clientId, firstName, lastName, email, hashedPassword, role}) {
        const client = await prismaClient.client.create({
            data: {
                Id: clientId, // Генерация UUID
                FirstName: firstName,
                LastName: lastName,
                Email: email,
                Password: hashedPassword,
                Role: role,
            }
        });

        return client;
    }

    static async updateUser({clientId, firstName, lastName, password}){

        const client = await prismaClient.client.update({
            where:{
                Id:  clientId
            },
            data:{
                FirstName: firstName,
                LastName: lastName,
                Password: password,
            }
        })

        return client;
    }

    static async getUserData(email) {
        const response = await prismaClient.client.findFirst({
            where: {
                Email: email
            }
        });

        return response;
    }
}

export default UserRepository;
