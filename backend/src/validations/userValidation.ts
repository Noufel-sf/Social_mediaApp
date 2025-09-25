import { body } from 'express-validator';

export const registerValidator = [
    body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3, max: 30 }).withMessage("Username must be 3–30 characters long")
    .matches(/^[a-zA-Z0-9._]+$/).withMessage("Username can only contain letters, numbers, dots and underscores")
    .custom((value) => {
      if (/^[._]/.test(value) || /[._]$/.test(value)) {
        throw new Error("Username cannot start or end with a dot or underscore");
      }
      if (/\.\.|__/.test(value)) {
        throw new Error("Username cannot contain consecutive dots or underscores");
      }
      return true;
    }),

    body('email')
    .isEmail()
    .withMessage('A valid email is required!')
    ,

    body('password')
    .isLength({ min: 6 })
    .withMessage('Password must be at least 6 characters!')

];


export const loginValidator = [

    body("username")
    .trim()
    .notEmpty().withMessage("Username is required")
    .isLength({ min: 3, max: 30 }).withMessage("Username must be 3–30 characters long")
    .matches(/^[a-zA-Z0-9._]+$/).withMessage("Username can only contain letters, numbers, dots and underscores")
    .custom((value) => {
      if (/^[._]/.test(value) || /[._]$/.test(value)) {
        throw new Error("Username cannot start or end with a dot or underscore");
      }
      if (/\.\.|__/.test(value)) {
        throw new Error("Username cannot contain consecutive dots or underscores");
      }
      return true;
    }),

    body('password')
    .notEmpty()
    .withMessage('Password is required!')

];

