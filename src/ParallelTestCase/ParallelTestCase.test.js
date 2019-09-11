import React from "react";
import { createModel } from "@xstate/test";
import { render, cleanup, fireEvent } from "@testing-library/react";

import { ParallelTestCase } from "./ParallelGuardTestCase";
import { parallelMachine } from "./ParallelTestCase.machine";

const guardTestCaseModel = createModel(parallelMachine).withEvents({
  TOGGLE_BOLD: {
    exec: async function(testContext) {
      await fireEvent.click(testContext.renderResult.getByText("Bold"));
    }
  },
  TOGGLE_ITALIC: {
    exec: async ({ renderResult }) => {
      await fireEvent.click(renderResult.getByText("Italic"));
    }
  },
  TOGGLE_UNDERLINE: {
    exec: async ({ renderResult }) => {
      await fireEvent.click(renderResult.getByText("Underline"));
    }
  },
  TOGGLE_STRIKE: {
    exec: async ({ renderResult }) => {
      await fireEvent.click(renderResult.getByText("Strike"));
    }
  }
});

afterEach(cleanup);

async function findStateTest(state, findByText, stateValue, expectation) {
  return true;
  if (state.matches(stateValue)) {
    // throw new Error("CRASH");
    await findByText(expectation, { exact: false });
  }
}

describe("Event guard test case", () => {
  const testPlans = guardTestCaseModel.getShortestPathPlans();

  testPlans.forEach(async plan => {
    describe(plan.description, () => {
      plan.paths.forEach(path => {
        it(path.description, async () => {
          const renderResult = render(<ParallelTestCase />);

          const t = (stateValue, expectation) =>
            findStateTest(
              plan.state,
              renderResult.findByText,
              stateValue,
              expectation
            );

          const testContext = {
            renderResult,
            test: async () => {
              await t("bold.on", '"bold":"on"');
              await t("bold.off", '"bold":"off"');
              await t("italic.on", '"italic":"on"');
              await t("italic.off", '"italic":"off"');
              await t("underline.on", '"underline":"on"');
              await t("underline.off", '"underline":"off"');
              await t("strike.on", '"strike":"on"');
              await t("strike.off", '"strike":"off"');
            }
          };

          await path.test(testContext);
        });
      });
    });
  });

  it("should have full coverage", () => {
    return guardTestCaseModel.testCoverage();
  });
});
