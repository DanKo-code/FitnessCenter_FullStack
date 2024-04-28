import prismaClient from "../../prisma/Clients.js";

class RefreshSessionRepository {
  static async getRefreshSession(refreshToken) {
    const response = await prismaClient.refresh_sessions.findFirst({
      where:{
        refresh_token: refreshToken
      }
    })

    return response;
  }

  static async createRefreshSession({ refreshSessionId, clientId, refreshToken, fingerprint }) {

    const refreshSession = await prismaClient.refresh_sessions.create({
      data:{
        id: refreshSessionId,
        user_id: clientId,
        refresh_token: refreshToken,
        finger_print: fingerprint.hash,
      }
    });

    return refreshSession;
  }

  static async deleteRefreshSession(refreshToken) {

    const refreshSessionToDelete = await prismaClient.refresh_sessions.findFirst({
      where:{
        refresh_token: refreshToken,
      }
    });

    const refreshSession = await prismaClient.refresh_sessions.delete({
      where:{
        id: refreshSessionToDelete.id,
      }
    });
  }
}

export default RefreshSessionRepository;
