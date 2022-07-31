import React, { Fragment, useState } from "react";

import { config } from "../App";

const InputTodo = () => {
  const [description, setDescription] = useState("");

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { description };
      await fetch(`${config.endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      window.location = "/";
    } catch (err) {
      console.error(err.message);
    }
  };
  return (
    <Fragment>
      <h1 className="text-center my-5">To-Do List Using PERN Stack</h1>
      <form className="d-flex justify-content-center" onSubmit={onSubmitForm}>
        <input
          type="text"
          placeholder="add todo"
          className="form-control w-50"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          style={{ backgroundColor: "black", color: "white" }}
        />
        {"       "}
        <button className="btn btn-success" style={{ marginLeft: "3px" }}>
          +
        </button>
      </form>
    </Fragment>
  );
};

export default InputTodo;
