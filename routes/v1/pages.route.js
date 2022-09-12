const express = require("express");
const router = express.Router();

/**
 * For single Page
 */
 router.get("/", (req,res, next)=> {
    res.status(200).json({
        name: 'API NodeJs',
        version: '1.0'
    });
 });

module.exports = router;