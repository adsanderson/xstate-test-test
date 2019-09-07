import React from "react";
import { useMachine } from "@xstate/react";
import { guardMachine } from "./EventGuardTestCase.machine";

export function EventGuardTestCase() {
  const [state, send] = useMachine(
    guardMachine.withConfig({
      guards: {
        eventGuard: (_, evt) => evt.isNext
      }
    })
  );
  return (
    <div className="App">
      <h2>{JSON.stringify(state.value)}</h2>
      <button onClick={() => send({ type: "TRY_EVENT", isNext: true })}>
        try event
      </button>

      <h3>{state.context.isBadFlag}</h3>
    </div>
  );
}
