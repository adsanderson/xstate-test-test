import React from "react";
import { useMachine } from "@xstate/react";
import { parallelMachine } from "./ParallelTestCase.machine";

const l = args => {
  console.log(args);
  return args;
};

export function ParallelTestCase() {
  const [state, send] = useMachine(parallelMachine);
  return (
    <div className="App">
      <h2>{JSON.stringify(state.value)}</h2>
      <button onClick={() => send("TOGGLE_BOLD")}>Bold</button>
      <button onClick={() => send("TOGGLE_ITALIC")}>Italic</button>
      <button onClick={() => send("TOGGLE_UNDERLINE")}>Underline</button>
      <button onClick={() => send("TOGGLE_STRIKE")}>Strike</button>
    </div>
  );
}
