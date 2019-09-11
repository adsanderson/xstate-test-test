import React from "react";
import { Toggle } from "./Toggle/Toggle";
import { ToggleShared } from "./ToggleShared/ToggleShared";
import "./App.css";
import { TestCaseA } from "./multipleTestCases/TestCaseA";
import { TestCaseB } from "./multipleTestCases/TestCaseB";
import { PromiseTestCase } from "./PromiseTestCase/PromiseTestCase";
import { ExistingComponentTestCase } from "./ExistingComponentTestCase/ExistingComponentTestCase";
import { ParallelTestCase } from "./ParallelTestCase/ParallelGuardTestCase";

function defer() {
  var res, rej;

  var promise = new Promise((resolve, reject) => {
    res = resolve;
    rej = reject;
  });

  promise.resolve = res;
  promise.reject = rej;

  return promise;
}

const d = defer();

export function App() {
  return (
    <div className="App">
      <Toggle />
      <ToggleShared />
      <TestCaseA />
      <TestCaseB />
      <PromiseTestCase
        aPromise={() => {
          // const d = defer();
          // console.log(d)
          setTimeout(() => d.resolve("data"), 100);
          return d;
        }}
      />
      <ParallelTestCase />
      <ExistingComponentTestCase />
    </div>
  );
}
