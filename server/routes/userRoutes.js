const express = require("express");
const asyncHandler = require("../middleware/asyncHandler");

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = require("../controllers/userController");

const router = express.Router();



const checkRequest = (req, res, next) => {
    req.testValue = "Hello from middleware";
   console.log(req.body);

  next();
};
const requestInfo = (req, res, next) => {
  req.message = "Data added by middleware";
  next();
};

router.post("/", asyncHandler(createUser));
router.get("/", asyncHandler(getUsers));
router.get("/:id", asyncHandler(getUserById));
router.put("/:id", asyncHandler(updateUser));
router.delete("/:id", asyncHandler(deleteUser));

module.exports = router;