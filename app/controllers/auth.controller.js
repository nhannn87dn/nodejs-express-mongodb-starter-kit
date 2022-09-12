const {authService} = require("../services");
const catchAsync = require("../utils/catchAsync");
const requestHandler = require("../utils/requestHandler");

const authLogin = catchAsync(async (req, res)=> {
    const token = await authService.authLogin(req.body);
    requestHandler.sendSuccess(res, 'successful')({'token':token});
   
});

module.exports = {
    authLogin,

}
