export const users = require("express").Router();
const usersController = require("./users.controller.js");
const jsonparser = require("body-parser").json();

users
  .route("/users", jsonparser)
  .get(usersController.usersGetAll)
  .post(usersController.usersInsert)
  .put(usersController.usersUpdate);

users
  .route("/users/:usersid", jsonparser)
  .get(usersController.usersGetByID)
  .patch(usersController.usersPatch)
  .delete(usersController.usersDeleteByID);
