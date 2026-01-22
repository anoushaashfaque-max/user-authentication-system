const express = require("express");
const { register, login } = require("../controllers/authController");
const {protect} = require("../middleware/authMiddleware")

const router = express.Router();

router.get("/dashboard", protect, (req, res) => {
    res.json({ msg: `Welcome ${req.user.name}`, user: req.user });
  });
router.post("/register", register);
router.post("/login", login);

module.exports = router;
