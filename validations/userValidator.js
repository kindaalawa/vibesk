const { check } = require('express-validator');

const insertUserValidation = [
    check('user_Email').notEmpty().withMessage('Email is required'),
    check('user_Email').isEmail().withMessage('Invalid Email Format'),
    check('user_Password').notEmpty().withMessage('Password is required'),
    check('user_Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('user_Password').isStrongPassword().withMessage("You entered a weak password"),
    check('user_FullName').notEmpty().withMessage('Full Name is required'),
    check('user_PhoneNumber').notEmpty().withMessage('Phone Number is required'),
];

const updateUserValidation = [
    check('user_ID').notEmpty().withMessage('UserID is required'),
    check('user_Email').notEmpty().withMessage('Email is required'),
    check('user_Email').isEmail().withMessage('Invalid Email Format'),
    check('user_Password').notEmpty().withMessage('Password is required'),
    check('user_Password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
    check('user_Password').isStrongPassword().withMessage("You entered a weak password"),
    check('user_FullName').notEmpty().withMessage('Full Name is required'),
    check('user_PhoneNumber').notEmpty().withMessage('Phone Number is required'),
];

module.exports = {
    insertUserValidation,
    updateUserValidation,
};
