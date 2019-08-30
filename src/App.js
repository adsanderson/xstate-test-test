import React from "react";
import { Toggle } from "./Toggle/Toggle";
import { ToggleShared } from "./ToggleShared/ToggleShared";
import "./App.css";

export function App() {
  return (
    <div className="App">
      <Toggle />
      <ToggleShared />
    </div>
  );
}
