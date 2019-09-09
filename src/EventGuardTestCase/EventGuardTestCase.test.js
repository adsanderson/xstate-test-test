import React from "react";
import { createModel } from "@xstate/test";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { EventGuardTestCase } from "./EventGuardTestCase";
import { eventGuardMachine } from "./EventGuardTestCase.machine";

const guardTestCaseModel = createModel(
  eventGuardMachine.withConfig({
    guards: {
      eventGuard: (_, evt) => evt.isNext
    }
  })
).withEvents({
  TRY_EVENT: {
    exec: async function({renderResult: {getByText}}, event) {
      const text = event.isNext ? "go left" : 'go right';
      await fireEvent.click(getByText(text));
    },
    cases: [{isNext: true}, {isNext: false}]
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
