import React, { Fragment, useEffect, useState } from "react";

import EditTodo from "./EditTodo";
import { config } from "../App";

const ListTodos = () => {
  const [todos, setTodos] = useState([]);

  //delete todo function
  async function deleteTodo(id) {
    try {
      await fetch(`${config.endpoint}/${id}`, {
        method: "DELETE",
      });

      setTodos(todos.filter((todo) => todo.todo_id !== id));
    } catch (err) {
      console.error(err.message);
    }
  }

  async function getTodos() {
    const res = await fetch(config.endpoint);
    const todoArray = await res.json();
    setTodos(todoArray);
  }

  useEffect(() => {
    getTodos();
  }, []);

  return (
    <Fragment>
      <table
        className="table table-borderless mt-5 text-light"
        style={{ marginLeft: "100px", marginRight: "100px" }}
      >
        <thead>
          <tr>
            <th style={{ width: "50%" }}>Description</th>
            <th style={{ width: "25%" }}>Edit</th>
            <th style={{ width: "25%" }}>Delete</th>
          </tr>
        </thead>
        <tbody>
          {todos.map((todo) => (
            <tr key={todo.todo_id}>
              <td>{todo.description}</td>
              <td>
                <EditTodo todo={todo} />
              </td>
              <td>
                <button
                  className="btn btn-danger"
                  onClick={() => deleteTodo(todo.todo_id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </Fragment>
  );
};

export default ListTodos;
