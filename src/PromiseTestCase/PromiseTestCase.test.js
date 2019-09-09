import React from "react";
import { createModel } from "@xstate/test";
import { render, cleanup, fireEvent, act } from "@testing-library/react";
import { PromiseTestCase } from "./PromiseTestCase";
import { promiseMachine } from "./PromiseTestCase.machine";

const promiseTestCaseModel = createModel(promiseMachine).withEvents({
  FETCH: {
    exec: async function(payload) {
      await fireEvent.click(payload.renderResult.getByText("Fetch"));
    }
  },
  ACKNOWLEDGE: {
    exec: async payload => {
      await fireEvent.click(payload.renderResult.getByText("Acknowledge"));
    }
  },
  "done.invoke.simplePromise": {
    exec: async (payload, event) => {
      await act(async () => {
        await payload.aPromise.resolve(event.data);
      });
    },
    cases: [{ data: "test" }, { data: "this is the data" }]
  },
  "error.platform.simplePromise": {
    exec: async payload => {
      setTimeout(() => payload.aPromise.reject(), 16);
    }
  }
});

afterEach(cleanup);

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

describe("promise test case", () => {
  const testPlans = promiseTestCaseModel.getShortestPathPlans();

  testPlans.forEach(async plan => {
    describe(`plan: ${plan.description}`, () => {
      plan.paths.forEach(path => {
        it(`path: ${path.description}`, async () => {
          const mockPromise = jest.fn();
          mockPromise.mockResolvedValue('"this is the data"');

          const d = defer();

          const renderResult = render(<PromiseTestCase aPromise={() => d} />);

          const payload = {
            mockPromise,
            renderResult,
            aPromise: d
          };

          await path.test(payload);
        });
      });
    });
  });

  it("should have full coverage", () => {
    return promiseTestCaseModel.testCoverage();
  });
});
