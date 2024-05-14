import prismaClient from "../../prisma/Clients.js";

class CommentRepository {
    static async createComment({commentId, commentBody, clientId, coachId}){

        const comment = await prismaClient.comment.create({
            data:{
                Id: commentId,
                CommentBody: commentBody,
                ClientsId: clientId,
                CouchesId: coachId,
            }
        });

        const commentToReturn = await prismaClient.comment.findUnique({
            where:{
                Id: commentId
            },
            include:{
                Client: true
            }
        })

        return commentToReturn
    }
}

export default CommentRepository;
