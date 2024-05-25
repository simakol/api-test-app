const Router = require("express");
const { check } = require("express-validator");
const router = new Router();
const controller = require("./authController");
const authMiddleware = require("./middleware/authMiddleware");
const roleMiddleware = require("./middleware/roleMiddleware");

router.post(
  "/registration",
  [
    check("username", "Username cannot be an empty string!").notEmpty(),
    check("password", "Password must be more than 6 characters").isLength({
      min: 6,
    }),
  ],
  controller.registration
);
router.post("/login", controller.login);
router.patch("/addToHistory/:username", controller.addToHistory);
router.patch("/clearHistory/:username", controller.clearHistory);
router.get("/users/:username", controller.getUserByUsername);
router.get("/users", roleMiddleware(["ADMIN"]), controller.getUsers);

module.exports = router;
