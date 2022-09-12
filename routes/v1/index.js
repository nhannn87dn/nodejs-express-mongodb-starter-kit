const express = require("express");
const router = express.Router();

const pagesRoute = require('./pages.route');
const userRoute = require('./user.route');
const authRoute = require('./auth.route');

const routes = [
    {
        path: '/v1',
        route: pagesRoute,
    },
    {
        path: '/v1/users',
        route: userRoute,
    },
    {
        path: '/v1/auth',
        route: authRoute,
    },

];

routes.forEach((route)=>{
    router.use(route.path,route.route);
})


module.exports = router;