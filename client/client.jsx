import React from "react";
import ReactDOM from "react-dom";
import { App } from "./App";
import { handlemodify } from "../shared/utility";

let state = undefined;

fetch("http://localhost:8000/data")
  .then((data) => data.json())
  .then((json) => {
    state = json;
    console.log("Got the state", json);
    render();
  });

const handleVote = (answerId, increment) => {
  state.answers = handlemodify(state.answers, answerId, increment);

  fetch(`vote/${answerId}?increment=${increment}`);

  render();
};

function render() {
  ReactDOM.hydrate(
    <App {...state} handlemodify={handleVote} />,
    document.querySelector("#root")
  );
}
