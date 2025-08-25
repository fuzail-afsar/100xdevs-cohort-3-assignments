const { Router } = require("express");
const userMiddleware = require("../middleware/user");
const bcrypt = require("bcrypt");
const { User } = require("../database")

const router = Router();
const SALT_ROUNDS = 5;

// User Routes
router.post('/signup', async (req, res) => {
    try {
        const { body } = req;
        const { email, password, firstName, lastName } = body;

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        const response = await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        res.json({ message: "User created successfully!" });
    } catch (error) {
        console.error(error);
        res.json({ message: "User creation failed!", error });
    }
});

router.post('/login', (req, res) => {
    // Implement user login logic
});

router.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic
});

module.exports = router