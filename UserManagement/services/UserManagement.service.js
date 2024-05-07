 
const User = require("../models/User");

class UserManagementService {
  async updateUserByID(user) {
 
      const updatedUser = await User.findByIdAndUpdate(user._id, user, {
        new: true,
      });
      return updatedUser;
    }
   
 
  async getUserByID(user) {
    
      const user = await User.findById(user._id);
      return user;
    
 
  }

  async getUserByCid(users){
    const users = await User.find({ 'courses.course': courseId });
    return users;

  }


  async countUsersInCourse(courseID) {
 
      const count = await User.countDocuments({ 'courses.course': courseID });
      return count;
  }
  }
 

module.exports = UserManagementService;
