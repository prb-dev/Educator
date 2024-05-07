const axios = require('axios');
const User = require("../models/User");

class UserManagementService {
  async updateUserByID(userId, userData) {
    try {
      const updatedUser = await User.findByIdAndUpdate(userId, userData, {
        new: true,
      });
      return updatedUser;
    } catch (error) {
      throw new Error(`Error updating user by ID: ${error.message}`);
    }
  }

  async getUserByID(userId) {
    try {
      const user = await User.findById(userId);
      if (!user) {
        throw new Error('User not found');
      }
      return user;
    } catch (error) {
      throw new Error(`Error getting user by ID: ${error.message}`);
    }
  }

  async countUsersInCourse(courseID) {
    try {
      const count = await User.countDocuments({ 'courses.name': courseID });
      return count;
    } catch (error) {
      throw new Error(`Error counting users in course: ${error.message}`);
    }
  }
}

module.exports = UserManagementService;
