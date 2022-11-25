// Import express
import express from "express";

//Import Role controller
import {
  getRoles,
  getRoleById,
  createRole,
  updateRole,
  deleteRole,
} from "../controllers/role.js";

//import User controller
import { userRegister } from "../controllers/user.js";
import { userLogin } from "../controllers/user.js";
import { GetUserDetails } from "../controllers/user.js";
import { validateAccessToken, validateJwtToken } from "../middleware.js";
import { deleteUserDetails } from "../controllers/user.js";
import { getUsersListByPage } from "../controllers/user.js";
import { postUserAddress } from "../controllers/user.js";
import { getUserListAddressById } from "../controllers/user.js";

//import uploadImage
import { userProfile } from "../controllers/user.js";
import { upload } from "../controllers/fileupload.js";
import { userForgotPassword } from "../controllers/user.js";
// Init express router
const router = express.Router();

// Route get all roles
router.get("/role/list", getRoles);
// Route get product by id
router.get("/role/:id", getRoleById);
// Route create a new product
router.post("/role/add", createRole);
// Route update role by id
router.put("/role/edit/:id", updateRole);
// Route delete role by id
router.delete("/role/delete/:id", deleteRole);

// Route for User register
router.post("/user/register", userRegister);

//Route for user login
router.post("/user/login", userLogin);

//route for user get
router.get("/user/get", validateJwtToken, validateAccessToken, GetUserDetails);
// route for user delete
router.delete(
  "/user/delete",
  validateJwtToken,
  validateAccessToken,
  deleteUserDetails
);

// get users data by page no.
router.get("/user/list/:page", validateJwtToken, getUsersListByPage);

//post for user address
router.post("/user/address", validateJwtToken, postUserAddress);

//userListAddress
router.get("/user/get/:id", validateJwtToken, getUserListAddressById);
//uploadImage
router.post(
  "/user/profile",
  validateJwtToken,
  upload.single("profile"),
  userProfile
);

// user forgot password
router.post("/user/forgot-password", userForgotPassword);

export default router;
