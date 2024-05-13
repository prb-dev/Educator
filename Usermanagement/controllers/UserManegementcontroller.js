// controllers/authController.js

const bcrypt = require("bcryptjs");
const User = require("../models/User.js")
const jwt = require("jsonwebtoken");
const Service = require("../services/UserManagement.service.js");

const service = new Service();

// Sign up
exports.signUp = async (req, res) => {
  try {
    const { username, password, Email, role } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      password: hashedPassword,
      Email,
      role,
    });

    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};


//get courses of users

exports.getCoursesOfUser = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: 'User not found',
      });
    }
 
    const courseIds = user.courses;
 
    const courses = await Course.find({ _id: { $in: courseIds } });

    res.status(200).json({
      success: true,
      courses,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// Log in
exports.logIn = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid username or password" });
    }
    const token = jwt.sign(
      {
        username: user.username,
        role: user.role,
        Email: user.Email,
        UserID: user.UserID,
      },
      process.env.JWT_SECRET
    );

    res.status(200).json({ message: "Logged in successfully", token, user });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error: error.message });
  }
};

exports.countUsersInCourse = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const count = await User.countDocuments({ "courses.course": courseId });
    res.status(200).json({ count });
  } catch (error) {
    res.status(500).json({
      message: "Error counting users in course",
      error: error.message,
    });
  }
};

exports.getUserByCID = async (req, res) => {
  try {
    const courseId = req.params.courseId;
    const users = await User.find({ "courses.name": courseId });
    if (users.length === 0) {
      return res
        .status(404)
        .json({ message: "Users not found for the specified course" });
    }
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting users", error: error.message });
  }
};

exports.updateUserByID = async (req, res) => {
  try {
    const userId = req.params.userId;
    const updateFields = req.body;

    // Check if the request body contains a password field
    if (updateFields.password) {
      // Hash the password
      const hashedPassword = await bcrypt.hash(updateFields.password, 10); // 10 is the salt rounds

      // Replace the plain password with the hashed password
      updateFields.password = hashedPassword;
    }

    const allowedFields = ["username", "courses", "password", "Email", "role"];
    const filteredUpdateFields = Object.keys(updateFields)
      .filter((key) => allowedFields.includes(key))
      .reduce((obj, key) => {
        obj[key] = updateFields[key];
        return obj;
      }, {});

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      filteredUpdateFields,
      { new: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user: updatedUser });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};
exports.getUserByID = async (req, res) => {
  try {
    const userId = req.params.userId;
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ user });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting user", error: error.message });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { userId } = req.params; // Get the userId from the URL parameters
    const deletedUser = await User.findByIdAndDelete(userId);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting users", error: error.message });
  }
};

exports.getStudentsByCid = async (req, res) => {
  try {
    const users = await service.getStudentsByCid(req.params.cid);
    res.status(200).json({ users });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error getting users", error: error.message });
  }
};

// Protected route
exports.protectedRoute = (req, res) => {
  res.status(200).json({ message: "You have accessed the protected route" });
};
