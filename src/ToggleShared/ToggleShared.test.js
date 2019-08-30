import React from "react";
import { createModel } from "@xstate/test";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { ToggleShared } from "./ToggleShared";
import { toggleMachine } from "./ToggleShared.machine";

const toggleSharedModel = createModel(toggleMachine).withEvents({
  TOGGLE: {
    exec: async renderResult => {
      await fireEvent.click(renderResult.getByText("Toggle"));
    }
  },
  SUB: {
    exec: async renderResult => {
      await fireEvent.click(renderResult.getByText("Sub toggle"));
    }
  },
  "done.invoke.simplePromise": {
    exec: async renderResult => {
      // await fireEvent.click(renderResult.getByText("Sub toggle"));
    }
  }
});

afterEach(cleanup);

describe("toggle shared", () => {
  console.time("plan");
  console.time("plan2");
  const testPlans = toggleSharedModel.getShortestPathPlans({
    filter: state => state.context.loops >= 0 && state.context.loops <= 2
  });
  console.timeEnd("plan");
  testPlans.forEach(async plan => {
    describe(`plan: ${plan.description}`, () => {
      plan.paths.forEach(path => {
        it(`path: ${path.description}`, async () => {
          const renderResult = render(<ToggleShared />);

          await path.test(renderResult);
        });
      });
    });
  });

  it("should have full coverage", () => {
    console.timeEnd("plan2");
    return toggleSharedModel.testCoverage();
  });
});
