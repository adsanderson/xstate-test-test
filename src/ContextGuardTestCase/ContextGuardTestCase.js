import React from "react";
import { useMachine } from "@xstate/react";
import { guardMachine } from "./ContextGuardTestCase.machine";

export function ContextGuardTestCase() {
  const [state, send] = useMachine(guardMachine);
  return (
    <div className="App">
      <h2>{JSON.stringify(state.value)}</h2>
      <button onClick={() => send("TOGGLE_BAD_FLAG")}>toggle bad flag</button>
      <button onClick={() => send("TRY_CONTEXT")}>try context</button>

      <h3>{state.context.isBadFlag}</h3>
    </div>
  );
}
