import React from "react";
import { createModel } from "@xstate/test";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { ToggleShared } from "./ToggleShared";
import { toggleMachine } from "./ToggleShared.machine";

const toggleSharedModel = createModel(toggleMachine, {
  events: {
    TOGGLE: {
      exec: async renderResult => {
        await fireEvent.click(renderResult.getByText("Toggle"));
      }
    },
    SUB: {
      exec: async renderResult => {
        await fireEvent.click(renderResult.getByText("Sub toggle"));
      }
    }
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
          const renderResult = render(<ToggleShared />);

          await path.test(renderResult);
        });
      });
    });
  });

  // const testPlansSimple = toggleModel.getSimplePathPlans();

  // testPlansSimple.forEach(async plan => {
  //   describe(`plan: ${plan.description}`, () => {
  //     plan.paths.forEach(path => {
  //       it(`path: ${path.description}`, async () => {
  //         const renderResult = render(<App />);

  //         await path.test(renderResult);
  //       });
  //     });
  //   });
  // });

  it("should have full coverage", () => {
    return toggleSharedModel.testCoverage();
  });
});
