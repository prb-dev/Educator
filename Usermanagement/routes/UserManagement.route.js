 
const express = require('express');

const router = express.Router();
const { signUp, getCoursesOfUser, deleteUser, getAllUsers, logIn, protectedRoute } = require('../controllers/UserManegementcontroller');

router.post('/signup', signUp);
router.get('/getCoursesByID', getCoursesOfUser);
router.post('/login', logIn);
router.get('/getAllUsers', getAllUsers);
router.delete('/deleteUser/:userId', deleteUser);
router.get('/protected', protectedRoute);
module.exports = router;
