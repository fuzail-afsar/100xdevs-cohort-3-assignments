const dotenv = require("dotenv");
dotenv.config();

const {
    PORT,
    SALT_ROUNDS,
    DB_URI,
    JWT_SECRET
} = process.env;

module.exports = {
    PORT,
    SALT_ROUNDS: Number(SALT_ROUNDS),
    DB_URI,
    JWT_SECRET
}