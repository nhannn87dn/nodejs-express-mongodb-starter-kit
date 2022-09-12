const {userService} = require("../services");
const catchAsync = require("../utils/catchAsync");
const AppError = require('../utils/AppError');
const requestHandler = require("../utils/requestHandler");


const getUser = catchAsync(async (req, res)=> {
    const {id} = req.params;
    const user = await userService.getUser(id);
    if(!user) throw new AppError('User not found',400);
    requestHandler.sendSuccess(res,'successful')({user});
});

const getUsers = catchAsync(async (req, res)=> {
    let pageNumber = req.query.page ? parseInt(req.query.page) : 1;
    const users = await userService.getUsers(pageNumber);
    requestHandler.sendSuccess(res,'successful')({users});
});

const createUser = catchAsync(async (req, res)=> {
    const user = await userService.createUser(req.body);
    requestHandler.sendSuccess(res,'successful')({user});
});

const updateUser = catchAsync(async (req, res)=> {
    const user = await userService.updateUser(id,req.body);
    requestHandler.sendSuccess(res,'successful')({user});
});

const deleteUser = catchAsync(async (req, res)=> {
    const id = req.params.id;
    const user = await userService.deleteUser(id);
    requestHandler.sendSuccess(res,'successful')({user});
});


module.exports = {
    getUser,
    getUsers,
    createUser,
    updateUser,
    deleteUser

}