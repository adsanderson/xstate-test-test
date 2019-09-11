import React from "react";
import { createModel } from "@xstate/test";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { ContextGuardTestCase } from "./ContextGuardTestCase";
import { guardMachine } from "./ContextGuardTestCase.machine";

const guardTestCaseModel = createModel(
  guardMachine.withConfig({
    guards: {
      eventGuard: () => true
    }
  })
).withEvents({
  TOGGLE_BAD_FLAG: {
    exec: async function(testContext) {
      await fireEvent.click(
        testContext.renderResult.getByText("toggle bad flag")
      );
    }
  },
  TRY_CONTEXT: {
    exec: async function(testContext) {
      await fireEvent.click(testContext.renderResult.getByText("try context"));
    }
  },
  TRY_EVENT: {
    exec: async function(testContext) {
      await fireEvent.click(testContext.renderResult.getByText("try event"));
    }
  }
});

afterEach(cleanup);

describe("Context guard test case", () => {
  const testPlans = guardTestCaseModel.getShortestPathPlans();

  testPlans.forEach(async plan => {
    describe(`plan: ${plan.description}`, () => {
      plan.paths.forEach(path => {
        it(`path: ${path.description}`, async () => {
          const renderResult = render(<ContextGuardTestCase />);

          const testContext = {
            renderResult
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
