import React from "react";
import { Toggle } from "./Toggle/Toggle";
import { ToggleShared } from "./ToggleShared/ToggleShared";
import "./App.css";
import { TestCaseA } from "./multipleTestCases/TestCaseA";
import { TestCaseB } from "./multipleTestCases/TestCaseB";

export function App() {
  return (
    <div className="App">
      <Toggle />
      <ToggleShared />
      <TestCaseA />
      <TestCaseB />
    </div>
  );
}
