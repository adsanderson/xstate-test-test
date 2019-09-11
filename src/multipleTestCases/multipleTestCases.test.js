import React from "react";
import { createModel } from "@xstate/test";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { TestCaseA } from "./TestCaseA";
import { TestCaseB } from "./TestCaseB";
import { toggleMachine } from "./ToggleShared.machine";

const testsForTestCaseA = {
  one: renderResult => renderResult.findByText("one", { exact: false }),
  subOne: renderResult => renderResult.findByText("subOne", { exact: false }),
  subTwo: renderResult => renderResult.findByText("subTwo", { exact: false }),
  two: renderResult => renderResult.findByText('"two"'),
  three: renderResult => renderResult.findByText('"three"'),
  threeTransition: renderResult => renderResult.findByText('"threeTransition"'),
  four: renderResult => renderResult.findByText('"four"')
};

const reversString = str =>
  str
    .split("")
    .reverse()
    .join("");

const testsForTestCaseB = {
  one: renderResult =>
    renderResult.findByText(reversString("one"), { exact: false }),
  subOne: renderResult =>
    renderResult.findByText(reversString("subOne"), { exact: false }),
  subTwo: renderResult =>
    renderResult.findByText(reversString("subTwo"), { exact: false }),
  two: renderResult => renderResult.findByText(reversString('"two"')),
  three: renderResult => renderResult.findByText(reversString('"three"')),
  threeTransition: renderResult =>
    renderResult.findByText(reversString('"threeTransition"')),
  four: renderResult => renderResult.findByText(reversString('"four"'))
};

const toggleSharedModel = createModel(toggleMachine).withEvents({
  TOGGLE: {
    exec: async test => {
      await fireEvent.click(test.testContext.getByText("Toggle"));
    }
  },
  SUB: {
    exec: async test => {
      await fireEvent.click(test.testContext.getByText("Sub toggle"));
    }
  },
  "done.invoke.simplePromise": {
    exec: async test => {}
  }
});

afterEach(cleanup);

describe("toggle shared", () => {
  const testPlans = toggleSharedModel.getShortestPathPlans({
    filter: state => state.context.loops >= 0 && state.context.loops <= 2
  });
  testPlans.forEach(async plan => {
    describe(`plan: ${plan.description}`, () => {
      plan.paths.forEach(path => {
        it(`path: ${path.description}`, async () => {
          const renderResult = render(<TestCaseA />);

          const args = {
            tests: testsForTestCaseA,
            testContext: renderResult
          };

          await path.test(args);
        });
      });
    });
  });

  testPlans.forEach(async plan => {
    describe(`plan: ${plan.description}`, () => {
      plan.paths.forEach(path => {
        it(`path: ${path.description}`, async () => {
          const renderResult = render(<TestCaseB />);

          const args = {
            tests: testsForTestCaseB,
            testContext: renderResult
          };

          await path.test(args);
        });
      });
    });
  });

  it("should have full coverage", () => {
    return toggleSharedModel.testCoverage();
  });
});
