const mongoose = require('mongoose');
const { DB_URI } = require("../constant")


// Connect to MongoDB
mongoose.connect(DB_URI);

// Define schemas

const UserSchema = new mongoose.Schema({
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    firstName: { type: String, required: true },
    lastName: { type: String, required: true }
});

const TodoSchema = new mongoose.Schema(
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: 'User'
        },
        title: { type: String, required: true },
        description: { type: String },
        isCompleted: { type: Boolean }
    },
    { timestamps: true }
);

const User = mongoose.model('User', UserSchema);
const Todo = mongoose.model('Todo', TodoSchema);

module.exports = {
    User,
    Todo
}