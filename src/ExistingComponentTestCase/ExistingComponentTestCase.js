import React from "react";
import { useMachine } from "@xstate/react";
import { guardMachine } from "./ExistingComponentTestCase.machine";

export function GuardTestCase() {
  const [state, send] = useMachine(guardMachine);
  return (
    <div className="App">
      <h2>{state.value}</h2>
      <button onClick={() => send("TOGGLE_BAD_FLAG")}>toggle bad flag</button>
      <button onClick={() => send("TRY_CONTEXT")}>try context</button>
      <button onClick={() => send({ type: "TRY_EVENT", isNext: true })}>
        try event
      </button>

      <h3>{state.context.isBadFlag}</h3>
    </div>
  );
}
