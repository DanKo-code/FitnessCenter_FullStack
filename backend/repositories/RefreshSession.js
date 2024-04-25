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

    console.log("In createRefreshSession: ");
    console.log("refreshSessionId: "+refreshSessionId);
    console.log("clientId: "+clientId);
    console.log("refreshToken: "+refreshToken);
    console.log("fingerprint.hash: "+fingerprint.hash);

    const refreshSession = await prismaClient.refresh_sessions.create({
      data:{
        id: refreshSessionId,
        user_id: clientId,
        refresh_token: refreshToken,
        finger_print: fingerprint.hash,
      }
    });

    console.log('createRefreshSession.refreshSession: '+JSON.stringify(refreshSession, null, 2))

    return refreshSession;
  }

  static async deleteRefreshSession(refreshToken) {

    const refreshSessionToDelete = await prismaClient.refresh_sessions.findFirst({
      where:{
        refresh_token: refreshToken,
      }
    });

    console.log('deleteRefreshSession -> refreshSessionToDelete: '+JSON.stringify(refreshSessionToDelete, null, 2))

    const refreshSession = await prismaClient.refresh_sessions.delete({
      where:{
        id: refreshSessionToDelete.id,
      }
    });

    console.log('deleteRefreshSession -> refreshSession: '+JSON.stringify(refreshSession, null, 2))
  }
}

export default RefreshSessionRepository;
