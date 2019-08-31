import React from "react";
import { useMachine } from "@xstate/react";
import { promiseMachine } from "./PromiseTestCase.machine";

export function PromiseTestCase({ aPromise }) {
  const [state, send] = useMachine(
    promiseMachine.withConfig({
      services: {
        simplePromise: aPromise
      }
    })
  );
  return (
    <div className="App">
      <h2>{state.value}</h2>
      {state.matches("idle") && (
        <button onClick={() => send("FETCH")}>Fetch</button>
      )}
      {state.matches("done") ? (
        <button onClick={() => send("ACKNOWLEDGE")}>Acknowledge</button>
      ) : null}
      {state.matches("error") ? (
        <button onClick={() => send("ACKNOWLEDGE")}>Acknowledge</button>
      ) : null}
      {state.context.fetchedData}
    </div>
  );
}
