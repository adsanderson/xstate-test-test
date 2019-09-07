import React from "react";
import { createModel } from "@xstate/test";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { GuardTestCase } from "./GuardTestCase";
import { guardMachine } from "./GuardTestCase.machine";

const guardTestCaseModel = createModel(
  guardMachine.withConfig({
    guards: {
      eventGuard: () => true
    }
  })
).withEvents({
  TRY_EVENT: {
    exec: async function(payload) {
      await fireEvent.click(payload.renderResult.getByText("try event"));
    }
  }
});

afterEach(cleanup);

describe("Event guard test case", () => {
  const testPlans = guardTestCaseModel.getShortestPathPlans();

  testPlans.forEach(async plan => {
    describe(`plan: ${plan.description}`, () => {
      plan.paths.forEach(path => {
        it(`path: ${path.description}`, async () => {
          const renderResult = render(<GuardTestCase />);

          const payload = {
            renderResult
          };

          await path.test(payload);
        });
      });
    });
  });

  it("should have full coverage", () => {
    return guardTestCaseModel.testCoverage();
  });
});
