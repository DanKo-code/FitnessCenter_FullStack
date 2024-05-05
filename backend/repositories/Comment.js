import prismaClient from "../../prisma/Clients.js";

class CommentRepository {
    static async createComment({commentId, commentBody, clientId, coachId}){

        console.log('CommentRepository createComment')
        console.log('commentId: '+commentId)
        console.log('commentBody: '+commentBody)
        console.log('clientId: '+clientId)
        console.log('coachId: '+coachId)

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
