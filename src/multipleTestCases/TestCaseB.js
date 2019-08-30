import React from "react";
import { useMachine } from "@xstate/react";
import { toggleMachine } from "./ToggleShared.machine";

export function TestCaseB() {
  const [state, send] = useMachine(
    toggleMachine.withConfig({
      services: {
        simplePromise: () => new Promise(res => setTimeout(() => res(), 100))
      }
    })
  );
  return (
    <div className="App">
      <h2>
        {JSON.stringify(state.value)
          .split()
          .reverse()
          .join("")}
      </h2>
      <button onClick={() => send("TOGGLE")}>Toggle</button>
      {state.matches("one") && (
        <button onClick={() => send("SUB")}>Sub toggle</button>
      )}
    </div>
  );
}
