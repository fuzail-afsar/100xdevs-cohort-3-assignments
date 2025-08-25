const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const bcrypt = require("bcrypt");

const router = Router();
const SALT_ROUNDS = 5;

// User Routes
router.post('/signup', async (req, res) => {
    const { body } = req;
    const { email, password, firstName, lastName } = body;

    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    console.log(hashedPassword);
    res.json({ message: "User signed up successfully" });
});

router.post('/login', (req, res) => {
    // Implement user login logic
});

router.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic
});

module.exports = router