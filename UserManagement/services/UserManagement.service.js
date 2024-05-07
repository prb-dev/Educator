const axios = require('axios');

class UserMangementService {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

   

  async updateUser(userId, userData) {
    try {
      const response = await axios.put(`${this.baseUrl}/users/${userId}`, userData);
      return response.data;
    } catch (error) {
      throw new Error(`Error updating user: ${error.message}`);
    }
  }

  async getUserById(userId) {
    try {
      const response = await axios.get(`${this.baseUrl}/users/${userId}`);
      return response.data;
    } catch (error) {
      throw new Error(`Error getting user: ${error.message}`);
    }
  }

   
  async countUsersInCourse(courseID) {
    try {
      const response = await axios.get(`${this.baseUrl}/users/count-in-course/${courseID}`);
      return response.data.count;
    } catch (error) {
      throw new Error(`Error counting users in course: ${error.message}`);
    }
  }

  async getAllUsers() {
    try {
      const response = await axios.get(`${this.baseUrl}/users`);
      return response.data;
    } catch (error) {
      throw new Error(`Error getting all users: ${error.message}`);
    }
  }
}

module.exports = UserMangementService;
