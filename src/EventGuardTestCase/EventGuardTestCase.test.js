import React from "react";
import { createModel } from "@xstate/test";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { EventGuardTestCase } from "./EventGuardTestCase";
import { guardMachine } from "./EventGuardTestCase.machine";

const guardTestCaseModel = createModel(
  guardMachine.withConfig({
    guards: {
      eventGuard: (_, evt) => evt
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
          const renderResult = render(<EventGuardTestCase />);

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
