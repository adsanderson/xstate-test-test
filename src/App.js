import React from "react";
import { Toggle } from "./Toggle/Toggle";
import { ToggleShared } from "./ToggleShared/ToggleShared";
import "./App.css";
import { TestCaseA } from "./multipleTestCases/TestCaseA";
import { TestCaseB } from "./multipleTestCases/TestCaseB";
import { PromiseTestCase } from "./PromiseTestCase/PromiseTestCase";
import { GuardTestCase } from "./GuardTestCase/GuardTestCase";
import { ExistingComponentTestCase } from "./ExistingComponentTestCase/ExistingComponentTestCase";

export function App() {
  return (
    <div className="App">
      <Toggle />
      <ToggleShared />
      <TestCaseA />
      <TestCaseB />
      <PromiseTestCase
        aPromise={() => new Promise(res => setTimeout(res, 100))}
      />
      <GuardTestCase />
      <ExistingComponentTestCase />
    </div>
  );
}
