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
