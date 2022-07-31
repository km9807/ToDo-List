import "./App.css";

import React, { Fragment } from "react";

import InputTodo from "../src/components/InputTodo";
import ListTodos from "../src/components/ListTodo";

export const config = {
  endpoint: `https://todo-karan-postgre.herokuapp.com/todos`,
};

function App() {
  return (
    <Fragment>
      <div className="container">
        <InputTodo />
        <ListTodos />
      </div>
    </Fragment>
  );
}

export default App;
