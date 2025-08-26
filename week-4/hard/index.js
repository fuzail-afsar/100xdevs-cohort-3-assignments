const express = require("express");
const { PORT } = require("./constant")
const userRoutes = require("./routes/user");
const todoRoutes = require("./routes/todo");

const app = express();

app.use(express.json());

app.use('/user', userRoutes);
app.use('/todo', todoRoutes);
//  start writing your routes here

app.listen(PORT, () => console.log(`server is running at http://localhost:${PORT}`));

