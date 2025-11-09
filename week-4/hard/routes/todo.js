const { Router } = require("express");
const adminMiddleware = require("../middleware/user");
const { Todo } = require('../database');
const { validate } = require('../lib/zod');
const { createTodoSchema, updateTodoSchema } = require('../lib/zod/schema');

const router = Router();

// todo Routes
router.post('/', adminMiddleware, validate(createTodoSchema), async (req, res) => {
    try {
        const { title, description, isCompleted } = req.body;
        await Todo.create({ user: req.userId, title, description, isCompleted });

        res.status(201).json({ message: "Todo created successfully!" });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
});

router.put('/:id', adminMiddleware, validate(updateTodoSchema), async (req, res) => {
    try {
        const { userId, body, params } = req;
        const { title, description, isCompleted } = body;
        const { id } = params;

        await Todo.updateOne({ user: userId, _id: id }, { title, description, isCompleted })

        res.status(200).json({ message: "Todo updated successfully!" });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
});

router.delete('/', adminMiddleware, async (req, res) => {
    try {
        await Todo.deleteMany({ user: req.userId })

        res.status(204).json({ message: "Todos deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
});

router.delete('/:id', adminMiddleware, async (req, res) => {
    try {
        const { userId, params: { id } } = req;

        await Todo.deleteOne({ user: userId, _id: id })

        res.status(204).json({ message: "Todo deleted successfully!" });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
});


router.get('/', adminMiddleware, async (req, res) => {
    try {
        const { userId } = req;

        const todos = await Todo.find({ user: userId })

        res.status(200).json({ todos });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
});

router.get('/:id', adminMiddleware, async (req, res) => {
    try {
        const { userId, params: { id } } = req;

        const todo = await Todo.findOne({ user: userId, _id: id });

        res.status(200).json({ todo });
    } catch (error) {
        console.error(error);
        res.status(401).json({ error: error.message });
    }
});

module.exports = router;