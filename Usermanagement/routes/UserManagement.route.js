const express = require("express");

const router = express.Router();

const {
  signUp,
  deleteUser,
  getAllUsers,
  logIn,
  protectedRoute,
  getStudentsByCid,
    getCoursesOfUser,
    getUserByID
} = require("../controllers/UserManegementcontroller");

router.post("/signup", signUp);
router.post("/login", logIn);
router.get('/getCoursesByID/', getCoursesOfUser);
router.get("/getAllUsers", getAllUsers);
router.get("/getAllstudents/:cid", getStudentsByCid);
router.get("/getUserById/:userId", getUserByID);
router.delete("/deleteUser/:userId", deleteUser);
router.get("/protected", protectedRoute);

module.exports = router;
