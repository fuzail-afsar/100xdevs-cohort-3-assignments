const { Router } = require("express");
const bcrypt = require("bcrypt");
const jwt = require('jsonwebtoken');
const userMiddleware = require("../middleware/user");
const { User } = require("../database")
const { SALT_ROUNDS, JWT_SECRET } = require("../constant");
const { validate } = require("../lib/zod");
const { signupSchema, signinSchema } = require("../lib/zod/schema");

const router = Router();

// User Routes
router.post('/signup', validate(signupSchema), async (req, res) => {
    try {
        const { body } = req;
        const { email, password, firstName, lastName } = body;

        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);
        await User.create({
            email,
            password: hashedPassword,
            firstName,
            lastName
        });

        res.status(204).json({ message: "User created successfully!" });
    } catch (error) {
        console.error(error);
        res.status(400).json({ error: error.message });
    }
});

router.post('/login', validate(signinSchema), async (req, res) => {
    try {
        const { body } = req;
        const { email, password } = body;

        const user = await User.findOne({ email });
        if (!user) throw new Error('User not found!');

        const match = await bcrypt.compare(password, user.password);
        if (!match) throw new Error('Invalid credentials!');

        const token = jwt.sign({ id: user._id }, JWT_SECRET);

        res.json({ message: "Token generated!", token });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
});

router.post('/logout', userMiddleware, (req, res) => {
    // Implement logout logic
});

module.exports = router