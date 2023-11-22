const express = require('express');
const {
    getUsersController,
    getUserByIdController,
    insertUserController,
    updateUserController,
    deleteUserController
} = require('../controllers/userController');

const { 
    insertUserValidation,
    updateUserValidation,
} = require('../validations/userValidator');

const router = express.Router();

router.get('/users', getUsersController);
router.post('/user', getUserByIdController);
router.post('/newUser', insertUserValidation, insertUserController );
router.put('/user', updateUserValidation, updateUserController );
router.delete('/user', deleteUserController);

module.exports = router;
