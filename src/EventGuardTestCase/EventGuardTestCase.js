import React from "react";
import { useMachine } from "@xstate/react";
import { eventGuardMachine } from "./EventGuardTestCase.machine";

export function EventGuardTestCase() {
  const [state, send] = useMachine(
    eventGuardMachine.withConfig({
      guards: {
        eventGuard: (_, evt) => evt.isNext
      }
    })
  );
  return (
    <div className="App">
      <h2>{JSON.stringify(state.value)}</h2>
      <button onClick={() => send({ type: "TRY_EVENT", isNext: true })}>
        go left
      </button>
      <button onClick={() => send({ type: "TRY_EVENT", isNext: false })}>
        go right
      </button>
    </div>
  );
}
