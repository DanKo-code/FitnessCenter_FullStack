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

        return comment
    }
}

export default CommentRepository;
