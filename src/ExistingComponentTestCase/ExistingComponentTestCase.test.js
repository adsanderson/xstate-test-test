import React from "react";
import { createModel } from "@xstate/test";
import { render, cleanup, fireEvent } from "@testing-library/react";
import { ExistingComponentTestCase } from "./ExistingComponentTestCase";
import { existingComponentMachine } from "./ExistingComponentTestCase.machine";

const existingComponentTestCaseModel = createModel(
  existingComponentMachine
).withEvents({
  SEARCH: {
    exec: (testContext, cases) => {
      fireEvent.change(
        testContext.renderResult.getByTestId("autocompleteInput"),
        {
          target: { value: "apple" }
        }
      );
    },
    cases: []
  }
});

afterEach(cleanup);

describe("existing component test case", () => {
  const testPlans = existingComponentTestCaseModel.getShortestPathPlans();

  testPlans.forEach(async plan => {
    describe(`plan: ${plan.description}`, () => {
      plan.paths.forEach(path => {
        it(`path: ${path.description}`, async () => {
          const renderResult = render(<ExistingComponentTestCase />);

          const testContext = {
            renderResult
          };

          await path.test(testContext);
        });
      });
    });
  });

  it("should have full coverage", () => {
    return existingComponentTestCaseModel.testCoverage();
  });
});
