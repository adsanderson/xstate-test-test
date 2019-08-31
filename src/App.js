import React from "react";
import { Toggle } from "./Toggle/Toggle";
import { ToggleShared } from "./ToggleShared/ToggleShared";
import "./App.css";
import { TestCaseA } from "./multipleTestCases/TestCaseA";
import { TestCaseB } from "./multipleTestCases/TestCaseB";
import { PromiseTestCase } from "./PromiseTestCase/PromiseTestCase";

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
    </div>
  );
}
