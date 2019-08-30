import React from "react";
import { useMachine } from "@xstate/react";
import { toggleMachine } from "./toggle.machine";

export function Toggle() {
  const [state, send] = useMachine(toggleMachine);
  return (
    <div>
      <h2>{JSON.stringify(state.value)}</h2>
      <button onClick={() => send("TOGGLE")}>Toggle</button>
      {state.matches("one") && (
        <button onClick={() => send("SUB")}>Sub toggle</button>
      )}
    </div>
  );
}
