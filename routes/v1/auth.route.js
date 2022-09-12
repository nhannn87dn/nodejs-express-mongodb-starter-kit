const express = require("express");
const router = express.Router();
const {authController} = require("../../app/controllers");
const {authValidation} = require("../../app/validations");
const {validate} = require("../../app/middlewares");


/**
 * Authorized User
 */
router.post("/", validate(authValidation.authLogin), authController.authLogin);

router.post("/refresh-token/:id", (req,res, next)=> {
    res.status(200).send({message: 'refresh-token'});
});


router.post("/logout", (req,res, next)=> {
    res.status(200).send({message: 'logouted'});
});

//TODO: verifyToken 

module.exports = router;