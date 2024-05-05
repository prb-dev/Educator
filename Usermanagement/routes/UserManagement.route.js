const express = require('express');
const router = express.Router();
const { signUp, deleteUser, getAllUsers, logIn, protectedRoute } = require('../controllers/UserManegementcontroller');

router.post('/signup', signUp);
 
router.post('/login', logIn);

router.get('/getAllUsers', getAllUsers);
router.delete('/deleteUser/:userId', deleteUser); // Make sure the route is defined correctly
router.get('/protected', protectedRoute);

module.exports = router;