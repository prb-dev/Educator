import { RPCRequest } from "../utils/message passing/rabbit_mq.js";
import { customError } from "../utils/error.js";

class UserManagementSERVICE {
  async getUserByID(userID) {
    try {
      const requestPayload = {
        event: "GET_USER",
        id: userID,
      };
      const user = await RPCRequest(process.env.USER_QUEUE_NAME, requestPayload);
      return user;
    } catch (error) {
      throw error; // Rethrow the error for handling at higher levels
    }
  }

  async updateUserByID(userID) {
    try {
      const requestPayload = {
        event: "UPDATE_USER",
        userID,
      };
      const updatedUser = await RPCRequest(process.env.USER_QUEUE_NAME, requestPayload);
      return updatedUser;
    } catch (error) {
      throw error; // Rethrow the error for handling at higher levels
    }
  }

  async getUserCount(cid) {
    try {
      const requestPayload = {
        event: "GET_USER_COUNT",
        cid,
      };
      const userCount = await RPCRequest(process.env.USER_QUEUE_NAME, requestPayload);
      return userCount;
    } catch (error) {
      throw error; // Rethrow the error for handling at higher levels
    }
  }
}

export default UserManagementSERVICE ;
