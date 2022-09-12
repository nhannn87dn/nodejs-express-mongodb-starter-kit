const express = require("express");
const router = express.Router();
const { userController } = require("../../app/controllers");
const { userValidation } = require("../../app/validations");
const { validate, auth } = require("../../app/middlewares");
const { authorize, role } = require("../../app/utils");
/**
 *  User Management
 */

router.get("/", auth, authorize(role.admin), userController.getUsers);
router.get(
  "/:id",
  auth,
  authorize([role.admin, role.user, role.booking]),
  validate(userValidation.getUser),
  userController.getUser
);
router.post(
  "/",
  auth,
  authorize(role.admin),
  validate(userValidation.createUser),
  userController.createUser
);
router.put(
  "/:id",
  auth,
  authorize([role.admin, role.user, role.booking]),
  validate(userValidation.updateUser),
  userController.updateUser
);
router.delete(
  "/:id",
  authorize(role.admin),
  auth,
  validate(userValidation.deleteUser),
  userController.deleteUser
);

module.exports = router;
