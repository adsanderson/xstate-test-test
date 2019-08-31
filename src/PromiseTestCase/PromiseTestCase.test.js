import React from "react";
import { createModel } from "@xstate/test";
import { render, cleanup, fireEvent } from "@testing-library/react";
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
    exec: async payload => {}
  },
  "error.platform.simplePromise": {
    exec: async payload => {}
  }
});

afterEach(cleanup);

function setService(path, serviceName, preDone, preError) {
  if (path.state.event.type === `done.invoke.${serviceName}`) {
    return preDone;
  }
  if (path.state.event.type === `error.platform.${serviceName}`) {
    return preError;
  }
  if (
    path.segments.some(seg => seg.event.type === `done.invoke.${serviceName}`)
  ) {
    return preDone;
  }
  if (
    path.segments.some(
      seg => seg.event.type === `error.platform.${serviceName}`
    )
  ) {
    return preError;
  }
  return preDone;
}

describe("promise test case", () => {
  const testPlans = promiseTestCaseModel.getShortestPathPlans();
  testPlans.forEach(async plan => {
    describe(`plan: ${plan.description}`, () => {
      plan.paths.forEach(path => {
        it(`path: ${path.description}`, async () => {
          const mockPromise = jest.fn();
          mockPromise.mockResolvedValue('"this is the data"');

          const pathDependentPromise = setService(
            path,
            "simplePromise",
            () =>
              new Promise(res =>
                setTimeout(() => res('"this is the data"'), 50)
              ),
            () =>
              new Promise((_, rej) =>
                setTimeout(() => rej('"this is the data"'), 50)
              )
          );

          const renderResult = render(
            <PromiseTestCase aPromise={pathDependentPromise} />
          );

          const payload = {
            mockPromise,
            renderResult
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
