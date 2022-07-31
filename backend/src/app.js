const express = require("express");
const app = express();
const cors = require("cors");
const dbCursor = require("./db");
const fs = require("fs");
const path = require("path");

const config = require("./config.js");
const PORT = config.PORT;

app.use(cors());
app.use(express.json());

const filepath = path.join(__dirname, "database.sql");
var sql = fs.readFileSync(filepath, "utf8");
console.log(filepath);

app.get("/todos", async (req, res) => {
  try {
    const allTodos = await dbCursor.query("SELECT * from todo");
    res.status(200).json(allTodos.rows);
  } catch (err) {
    console.error(err.message);
  }
});

app.get("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const todo = await dbCursor.query("SELECT * FROM todo WHERE todo_id = $1", [
      id,
    ]);
    res.status(200).json(todo.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

app.post("/todos", async (req, res) => {
  try {
    const { description } = req.body;
    const newTodo = await dbCursor.query(
      "INSERT INTO todo (description) VALUES($1) RETURNING *",
      [description]
    );
    res.status(200).json(newTodo.rows[0]);
  } catch (err) {
    res.status(500).json(err.message);
  }
});

app.put("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    await dbCursor.query(
      "UPDATE todo SET description = $1 WHERE todo_id = $2",
      [description, id]
    );

    res.status(200).json("todo was updated");
  } catch (err) {
    console.error(err.message);
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await dbCursor.query("DELETE FROM todo WHERE todo_id = $1", [id]);
    res.status(200).json("todo was deleted");
  } catch (err) {
    console.error(err.message);
  }
});

dbCursor.connect((err) => {
  if (err) {
    return console.log(err);
  }
  console.log("DB Connected");
  dbCursor
    .query(sql)
    .then(() => {
      app.listen(PORT, () => {
        console.log(`Server is starting on port ${PORT}`);
      });
    })
    .catch((err) => console.log(err));
});
